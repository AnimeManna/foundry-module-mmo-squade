Hooks.once('init', () => {
  console.log('Mmo-squade module has been initalized');
});

const GUIDING_EFFECT_NAME = "Метка Уз";

/**
 * @param {Actor5e} actor 
 * @param {TokenDocument5e} target 
 * @param {object} rollConfig 
 */
async function addBonus(config, actor) {
  
  const target = game.user.targets.first();
  if (!target) return;

  const guidingBondEffect = target.actor.effects.find(effect => effect.name === GUIDING_EFFECT_NAME);

  if (!guidingBondEffect) return;

  if (guidingBondEffect.origin.includes(actor.uuid)) {
    
  config.rolls[0].parts ??= [];
  config.rolls[0].parts.push('1d4');
     
  }
}

Hooks.on('dnd5e.preRollAttack', (config) => {
  addBonus(config, config.subject.actor)
});

Hooks.on('dnd5e.preRollAbilityCheck', (config) => {
  addBonus(config, config.subject);
});

Hooks.on('dnd5e.preRollSavingThrow', (config) => {
  addBonus(config, config.subject);
});


