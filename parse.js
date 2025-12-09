/**
 * 统一 require 为 import，去除 IIFE、辅助函数，var→let/const，彻底清理 __extends/__decorate/__awaiter/__generator，并将 IIFE 枚举（包括 exports.IIFE）转为对象字面量，增加 CommonJS → ES6 导出，修正 export const ... = void 0; 错误
 */
module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // 删除 export const ... = void 0; 语句
  root.find(j.VariableDeclaration)
    .filter(path =>
      path.node.declarations.some(
        decl =>
          decl.id.type === 'Identifier' &&
          decl.init &&
          decl.init.type === 'UnaryExpression' &&
          decl.init.operator === 'void' &&
          decl.init.argument.value === 0
      )
    )
    .remove();

  // IIFE 枚举转 export const ... = { ... }
  root.find(j.ExpressionStatement)
    .filter(path => {
      const expr = path.node.expression;
      // 匹配 (function (t) {...})(exports.XXX || (exports.XXX = {}));
      return (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'FunctionExpression' &&
        expr.arguments.length === 1 &&
        (
          (expr.arguments[0].type === 'LogicalExpression' &&
            expr.arguments[0].left.type === 'MemberExpression' &&
            expr.arguments[0].left.object.name === 'exports' &&
            expr.arguments[0].right.type === 'AssignmentExpression' &&
            expr.arguments[0].right.left.type === 'MemberExpression' &&
            expr.arguments[0].right.left.object.name === 'exports')
          ||
          (expr.arguments[0].type === 'MemberExpression' &&
            expr.arguments[0].object.name === 'exports')
        )
      );
    })
    .forEach(path => {
      const expr = path.node.expression;
      // 获取枚举名
      let enumName = null;
      if (expr.arguments[0].type === 'LogicalExpression') {
        enumName = expr.arguments[0].left.property.name;
      } else if (expr.arguments[0].type === 'MemberExpression') {
        enumName = expr.arguments[0].property.name;
      }
      if (!enumName) return;
      // 解析成员
      const members = {};
      expr.callee.body.body.forEach(stmt => {
        if (
          stmt.type === 'ExpressionStatement' &&
          stmt.expression.type === 'AssignmentExpression'
        ) {
          const left = stmt.expression.left;
          const right = stmt.expression.right;
          // t[(t.KEY = value)] = 'KEY' 形式
          if (
            left.type === 'MemberExpression' &&
            left.object.name === 't' &&
            left.property.type === 'AssignmentExpression' &&
            left.property.left.type === 'MemberExpression' &&
            left.property.left.object.name === 't' &&
            left.property.left.property.type === 'Identifier'
          ) {
            const key = left.property.left.property.name;
            const value = left.property.right.value;
            members[key] = value;
          }
          // t.KEY = value 形式
          if (
            left.type === 'MemberExpression' &&
            left.object.name === 't' &&
            left.property.type === 'Identifier'
          ) {
            const key = left.property.name;
            members[key] = right.value;
          }
        }
      });
      // 直接导出枚举对象
      j(path).replaceWith(
        j.exportNamedDeclaration(
          j.variableDeclaration('const', [
            j.variableDeclarator(
              j.identifier(enumName),
              j.objectExpression(
                Object.entries(members).map(([k, v]) =>
                  j.property('init', j.identifier(k), j.literal(v))
                )
              )
            )
          ])
        )
      );
    });

  // 0.1 CommonJS → ES6 导出
  // module.exports = ... → export default ...
  root.find(j.AssignmentExpression, {
    left: { object: { name: 'module' }, property: { name: 'exports' } }
  }).forEach(path => {
    j(path).replaceWith(
      j.exportDefaultDeclaration(path.node.right)
    );
  });

  // exports.default = ... → export default ...
  root.find(j.AssignmentExpression, {
    left: { object: { name: 'exports' }, property: { name: 'default' } }
  }).forEach(path => {
    j(path).replaceWith(
      j.exportDefaultDeclaration(path.node.right)
    );
  });

  // exports.xxx = ... → export const xxx = ...（排除 default）
  root.find(j.AssignmentExpression, {
    left: { object: { name: 'exports' } }
  }).forEach(path => {
    if (path.node.left.property.name !== 'default') {
      // 禁止 default 作为变量名
      if (path.node.left.property.name === 'default') return;
      j(path).replaceWith(
        j.exportNamedDeclaration(
          j.variableDeclaration('const', [
            j.variableDeclarator(
              j.identifier(path.node.left.property.name === 'default' ? '_default' : path.node.left.property.name),
              path.node.right
            )
          ])
        )
      );
    }
  });

  // 1. require -> import（支持解构和无赋值）
  // 1.1 有赋值的 require
  const requireDecls = root.find(j.VariableDeclaration)
    .filter(path =>
      path.node.declarations.length === 1 &&
      path.node.declarations[0].init &&
      path.node.declarations[0].init.type === 'CallExpression' &&
      path.node.declarations[0].init.callee.name === 'require'
    );
  const importDecls = [];
  requireDecls.forEach(path => {
    const decl = path.node.declarations[0];
    const source = decl.init.arguments[0].value;
    if (decl.id.type === 'Identifier') {
      importDecls.push(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(decl.id.name))],
          j.literal(source)
        )
      );
    } else if (decl.id.type === 'ObjectPattern') {
      importDecls.push(
        j.importDeclaration(
          decl.id.properties.map(p => j.importSpecifier(j.identifier(p.key.name))),
          j.literal(source)
        )
      );
    }
  });
  requireDecls.remove();

  // 1.2 无赋值的 require
  root.find(j.ExpressionStatement, {
    expression: {
      type: 'CallExpression',
      callee: { name: 'require' }
    }
  }).forEach(path => {
    const source = path.node.expression.arguments[0].value;
    const importStmt = j.importDeclaration([], j.literal(source));
    j(path).replaceWith(importStmt);
  });

  // 插入 import 语句到文件顶部
  const body = root.get().node.program.body;
  let insertIdx = 0;
  if (body.length && body[0].type === 'ExpressionStatement' && body[0].directive === 'use strict') {
    insertIdx = 1;
  }
  body.splice(insertIdx, 0, ...importDecls);

  // 2. 去除 __extends/__decorate/__awaiter/__generator 调用（所有场景）
  const helperNames = ['__extends', '__decorate', '__awaiter', '__generator'];

  // 2.1 独立表达式
  root.find(j.ExpressionStatement, {
    expression: {
      type: 'CallExpression',
      callee: { name: name => helperNames.includes(name) }
    }
  }).remove();

  // 2.2 变量声明
  root.find(j.VariableDeclaration)
    .filter(path =>
      path.node.declarations.some(
        decl =>
          decl.init &&
          decl.init.type === 'CallExpression' &&
          helperNames.includes(decl.init.callee.name)
      )
    )
    .remove();

  // 2.3 赋值表达式
  root.find(j.ExpressionStatement, {
    expression: {
      type: 'AssignmentExpression',
      right: {
        type: 'CallExpression',
        callee: { name: name => helperNames.includes(name) }
      }
    }
  }).remove();

  // 2.4 exports.default = ... 右侧为 helper 调用
  root.find(j.AssignmentExpression, {
    left: { object: { name: 'exports' }, property: { name: 'default' } },
    right: { type: 'CallExpression', callee: { name: name => helperNames.includes(name) } }
  }).forEach(path => {
    j(path.parent).remove();
  });

  // 2.5 return __awaiter(...) 或 return __generator(...)
  root.find(j.ReturnStatement, {
    argument: {
      type: 'CallExpression',
      callee: { name: name => helperNames.includes(name) }
    }
  }).remove();

  // 2.6 __awaiter/__generator 作为参数传递
  root.find(j.CallExpression, {
    arguments: args => args.some(
      arg => arg.type === 'CallExpression' && helperNames.includes(arg.callee.name)
    )
  }).forEach(path => {
    path.node.arguments = path.node.arguments.filter(
      arg => !(arg.type === 'CallExpression' && helperNames.includes(arg.callee.name))
    );
  });

  // 2.7 __awaiter/__generator 作为赋值右值
  root.find(j.AssignmentExpression, {
    right: {
      type: 'CallExpression',
      callee: { name: name => helperNames.includes(name) }
    }
  }).remove();

  // 3. IIFE 枚举转对象字面量（变量声明式）
  root.find(j.VariableDeclaration)
    .filter(path => {
      const decl = path.node.declarations[0];
      // 检查是否 IIFE 形式的枚举
      return (
        decl &&
        decl.init &&
        decl.init.type === 'CallExpression' &&
        decl.init.callee.type === 'FunctionExpression' &&
        decl.init.callee.body.body.some(
          stmt =>
            stmt.type === 'ExpressionStatement' &&
            stmt.expression.type === 'AssignmentExpression' &&
            stmt.expression.left.type === 'MemberExpression'
        )
      );
    })
    .forEach(path => {
      const decl = path.node.declarations[0];
      const enumName = decl.id.name;
      const iifeBody = decl.init.callee.body.body;
      const members = {};
      iifeBody.forEach(stmt => {
        if (
          stmt.type === 'ExpressionStatement' &&
          stmt.expression.type === 'AssignmentExpression'
        ) {
          const left = stmt.expression.left;
          const right = stmt.expression.right;
          if (
            left.type === 'MemberExpression' &&
            left.object.name === enumName &&
            left.property.type === 'Identifier' &&
            typeof right.value !== 'undefined'
          ) {
            members[left.property.name] = right.value;
          }
        }
      });
      // 直接导出枚举对象
      j(path).replaceWith(
        j.exportNamedDeclaration(
          j.variableDeclaration('const', [
            j.variableDeclarator(
              j.identifier(enumName),
              j.objectExpression(
                Object.entries(members).map(([k, v]) =>
                  j.property('init', j.identifier(k), j.literal(v))
                )
              )
            )
          ])
        )
      );
    });

  // 4. 去除 IIFE（立即执行函数表达式）包裹
  root.find(j.VariableDeclaration)
    .filter(path => {
      const decl = path.node.declarations[0];
      return (
        decl &&
        decl.init &&
        decl.init.type === 'CallExpression' &&
        decl.init.callee.type === 'FunctionExpression'
      );
    })
    .forEach(path => {
      const decl = path.node.declarations[0];
      const iifeBody = decl.init.callee.body.body;
      const returnStmt = iifeBody.find(stmt => stmt.type === 'ReturnStatement');
      if (returnStmt) {
        decl.init = returnStmt.argument;
        const parentBody = path.parent.node.body;
        const idx = parentBody.indexOf(path.node);
        iifeBody.forEach(stmt => {
          if (stmt.type !== 'ReturnStatement') {
            parentBody.splice(idx, 0, stmt);
          }
        });
      }
    });

  // 5. var → let/const
  root.find(j.VariableDeclaration, { kind: 'var' }).forEach(path => {
    // 如果所有声明都初始化了，则用 const，否则用 let
    let shouldBeConst = true;
    path.node.declarations.forEach(decl => {
      if (!decl.init) shouldBeConst = false;
    });
    path.node.kind = shouldBeConst ? 'const' : 'let';
  });

  return root.toSource({ quote: 'single' });
};