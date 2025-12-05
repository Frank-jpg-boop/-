const { ccclass, property } = cc._decorator;

/**
 * Controls boss projectile behavior
 */
@ccclass
export default class BossProjectile extends cc.Component {
    @property(cc.Float)
    speed: number = 400;

    @property(cc.Float)
    damage: number = 20;

    @property(cc.Float)
    lifeTime: number = 8.0;

    @property(cc.Node)
    visualEffect: cc.Node = null;

    private direction: cc.Vec3 = cc.v3(0, 0, 0);
    private isActive: boolean = false;

    onLoad() {
        this.isActive = false;
    }

    start() {
        this.scheduleOnce(() => {
            this.destroy();
        }, this.lifeTime);
    }

    update(dt: number) {
        if (!this.isActive) return;

        const velocity = this.direction.mul(this.speed * dt);
        this.node.position = this.node.position.add(velocity);
    }

    initialize(direction: cc.Vec3) {
        this.direction = direction.normalize();
        this.isActive = true;
        
        // Rotate to face direction
        const angle = Math.atan2(direction.y, direction.x);
        this.node.angle = cc.misc.radiansToDegrees(angle);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.node.group === 'player') {
            this.hitTarget(other.node);
        }
    }

    private hitTarget(target: cc.Node) {
        // Deal damage to target
        this.node.emit('projectile-hit', { target, damage: this.damage });
        this.destroy();
    }

    private destroy() {
        if (this.visualEffect) {
            const effect = cc.instantiate(this.visualEffect);
            effect.parent = this.node.parent;
            effect.position = this.node.position;
        }
        this.node.destroy();
    }
}
