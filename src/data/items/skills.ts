import { SkillItem } from '../../items/skillItem';
import { Rarity } from '../../items/rarity';
import { bless } from '../skills/bless';
import { devDie } from '../skills/devDie';
import { devHeal } from '../skills/devHeal';
import { devRush } from '../skills/devRush';
import { fireball } from '../skills/fireball';
import { healBurst } from '../skills/healBurst';
import { heal } from '../skills/heal';
import { heavySlash } from '../skills/heavySlash';
import { magicBolt } from '../skills/magicBolt';
import { quadStrike } from '../skills/quadStrike';
import { sacrifice } from '../skills/sacrifice';
import { sanguineStrike } from '../skills/sanguineStrike';

export const blessSkill = new SkillItem({ skilldef: bless, rarity: Rarity.RARE });
export const magicBoltSkill = new SkillItem({ skilldef: magicBolt, rarity: Rarity.COMMON });
export const fireballSkill = new SkillItem({ skilldef: fireball, rarity: Rarity.COMMON });
export const healSkill = new SkillItem({ skilldef: heal, rarity: Rarity.COMMON });
export const healBurstSkill = new SkillItem({ skilldef: healBurst, rarity: Rarity.RARE });

export const quadStrikeSkill = new SkillItem({ skilldef: quadStrike, rarity: Rarity.RARE });
export const heavySlashSkill = new SkillItem({ skilldef: heavySlash, rarity: Rarity.COMMON });
export const sacrificeSkill = new SkillItem({ skilldef: sacrifice, rarity: Rarity.EPIC });
export const sanguineStrikeSkill = new SkillItem({
  skilldef: sanguineStrike,
  rarity: Rarity.EPIC,
});

export const devDieSkill = new SkillItem({ skilldef: devDie, rarity: Rarity.LEGENDARY });
export const devHealSkill = new SkillItem({ skilldef: devHeal, rarity: Rarity.LEGENDARY });
export const devRushSkill = new SkillItem({ skilldef: devRush, rarity: Rarity.LEGENDARY });
