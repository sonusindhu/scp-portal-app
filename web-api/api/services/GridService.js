// Grid Service

module.exports = {
  //#region Filters Object
  mapListFilter: (filter) => {
    if (filter.filters?.length > 0) {
      return module.exports.createQueryFromFilter(filter.filters, filter.logic);
    }
    return {};
  },

  formatQueries: (filter, querries = []) => {
    switch (filter.operator) {
      case "contains":
        return {
          [`${filter.field}`]: {
            contains: filter.value,
          },
        };
      case "eq":
        return { [`${filter.field}`]: filter.value };
    }
    return querries;
  },
  createQueryFromFilter: (filters, logic, mainQuery = {}) => {
    let querries = {};
    for (let filter of filters) {
      if (filter.logic) {
        querries = module.exports.createQueryFromFilter(
          filter.filters,
          filter.logic
        );
        mainQuery[logic] = mainQuery[logic] || [];
        mainQuery[logic] = [...mainQuery[logic], querries];
      } else {
        mainQuery[logic] = mainQuery[logic] || [];
        mainQuery[logic] = [
          ...mainQuery[logic],
          module.exports.formatQueries(filter),
        ];
      }
    }
    return mainQuery;
  },

  //#endregion

  //#region SQL Query

  mapListFilterSql: (filter) => {
    if (filter.filters?.length > 0) {
      const filters = module.exports.createQueryFromFilter(
        filter.filters,
        filter.logic
      );
      return ` where ` + filters.join(` ${filter.logic} `);
    }
    return "";
  },

  formatSqlQueries: (filter, querries = []) => {
    switch (filter.operator) {
      case "contains":
        console.log(filter.operator);
        return `${filter.field} LIKE '%${filter.value}%'`;
      case "eq":
        return `${filter.field} = '${filter.value}'`;
    }
    return querries;
  },

  createQueryFromFilter: (filters, logic, mainQuery = []) => {
    let querries = [];
    for (let filter of filters) {
      if (filter.logic) {
        querries = module.exports.createQueryFromFilter(
          filter.filters,
          filter.logic
        );
        mainQuery.push(querries);
      } else {
        mainQuery.push(module.exports.formatSqlQueries(filter));
      }
    }
    return mainQuery;
  },

  //#endregion
};
