/*
* 产生唯一id
*/
class IDGenerator {
    private static MONSTER_ID_BASE = 10000;
    private static PROP_ID_BASE = 20000;
    private static BULLET_ID_BASE = 30000;

    private static monsterIdCount: number = 0;
    public static GenMonsterID() {
        let id = IDGenerator.MONSTER_ID_BASE + ++IDGenerator.monsterIdCount;
        if (id >= Number.MAX_VALUE - 1) {
            IDGenerator.monsterIdCount = 0;
            id = IDGenerator.MONSTER_ID_BASE + ++IDGenerator.monsterIdCount
        }
        return id;
    }

    private static propIdCount: number = 0;
    public static GenPropID() {
        let id = IDGenerator.PROP_ID_BASE + ++IDGenerator.propIdCount;
        if (id >= Number.MAX_VALUE - 1) {
            IDGenerator.propIdCount = 0;
            id = IDGenerator.PROP_ID_BASE + ++IDGenerator.propIdCount
        }
        return id;
    }

    private static bulletIdCount: number = 0;
    public static GenBulletID() {
        let id = IDGenerator.BULLET_ID_BASE + ++IDGenerator.bulletIdCount;
        if (id >= Number.MAX_VALUE - 1) {
            IDGenerator.bulletIdCount = 0;
            id = IDGenerator.BULLET_ID_BASE + ++IDGenerator.bulletIdCount
        }
        return id;
    }
}