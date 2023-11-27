
// Models event define relation
// events.belongsTo(models.cities,{foreignKey:"id_city"})
// events.hasMany(models.tickets,{foreignKey:"id_event"})
// events.belongsTo(models.categories,{foreignKey:"id_category"})

// models cities 
// cities.hasMany(models.events,{foreignKey:"id_city"})

// models promos
// promos.belongsTo(models.tickets,{foreignKey:"id_ticket"})
// promos.hasMany(models.promo_codes,{foreignKey:"id_promo"})

// model tickets
// tickets.belongsTo(models.events,{foreignKey:"id_event"})
// tickets.hasMany(models.promos,{foreignKey:"id_ticket"})