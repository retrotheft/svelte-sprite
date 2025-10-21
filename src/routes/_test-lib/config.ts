export interface BattleEntityConfig {
   states: Record<string, number>;
   spriteSize: { width: string; height: string };
   maxHp: number;
   idleState: string;
   attackState: string;
   hurtState: string;
   deathState: string;
   idleLoopMultiplier: number;
   attackDelay: number;
}

export const knightConfig: BattleEntityConfig = {
   states: {
      "ATTACK-1": 6,
      "IDLE": 7,
      "HURT": 4,
      "DEATH": 12
   },
   spriteSize: { width: "96px", height: "84px" },
   maxHp: 3,
   idleState: "IDLE",
   attackState: "ATTACK-1",
   hurtState: "HURT",
   deathState: "DEATH",
   idleLoopMultiplier: 2,
   attackDelay: 3
};


export const demonConfig: BattleEntityConfig = {
   states: {
      "DEMON-IDLE": 4,
      "DEMON-HURT": 4,
      "DEMON-ATTACK": 8,
      "DEMON-DEATH": 6
   },
   spriteSize: { width: "81px", height: "71px" },
   maxHp: 2,
   idleState: "DEMON-IDLE",
   attackState: "DEMON-ATTACK",
   hurtState: "DEMON-HURT",
   deathState: "DEMON-DEATH",
   idleLoopMultiplier: 3,
   attackDelay: 3
};
