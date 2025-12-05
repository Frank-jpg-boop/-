const { ccclass, property } = cc._decorator;

/**
 * Manages NPC bullet spawning and pooling
 */
@ccclass
export default class NpcBulletManager extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Integer)
    poolSize: number = 20;

    @property(cc.Float)
    bulletSpeed: number = 300;

    private bulletPool: cc.NodePool = null;

    onLoad() {
        this.initBulletPool();
    }

    private initBulletPool() {
        this.bulletPool = new cc.NodePool();
        for (let i = 0; i < this.poolSize; i++) {
            const bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    }

    spawnBullet(position: cc.Vec3, direction: cc.Vec3) {
        let bullet: cc.Node = null;
        
        if (this.bulletPool.size() > 0) {
            bullet = this.bulletPool.get();
        } else {
            bullet = cc.instantiate(this.bulletPrefab);
        }

        bullet.parent = this.node;
        bullet.position = position;
        
        // Set bullet velocity
        const rigidBody = bullet.getComponent(cc.RigidBody);
        if (rigidBody) {
            const velocity = direction.normalize().mul(this.bulletSpeed);
            rigidBody.linearVelocity = velocity;
        }

        bullet.active = true;
        this.scheduleBulletRecycle(bullet);
    }

    private scheduleBulletRecycle(bullet: cc.Node) {
        this.scheduleOnce(() => {
            this.recycleBullet(bullet);
        }, 5.0);
    }

    recycleBullet(bullet: cc.Node) {
        if (bullet && bullet.isValid) {
            bullet.active = false;
            this.bulletPool.put(bullet);
        }
    }
}
