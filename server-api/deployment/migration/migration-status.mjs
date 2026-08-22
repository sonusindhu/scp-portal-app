const migrationPlan = [
  {
    legacy: 'AuthController',
    legacyRoutes: ['signup', 'login', 'logout', 'sendpassword', 'updatePassword'],
    newModule: 'auth',
    status: 'done',
    notes: ['Route layer created', 'Controller/service/repository layered', 'Response contract standardized'],
  },
  {
    legacy: 'CommonController',
    legacyRoutes: ['health', 'common lookup actions'],
    newModule: 'health',
    status: 'done',
    notes: ['Health endpoint available', 'Swagger docs added'],
  },
  {
    legacy: 'CompanyController',
    legacyRoutes: ['listOfNames', 'listView', 'create', 'update', 'findById', 'delete', 'deleteRange'],
    newModule: 'company',
    status: 'pending',
    notes: ['Pagination needs meta.total mapping', 'Use same field semantics as legacy listView'],
  },
  {
    legacy: 'ContactController',
    legacyRoutes: ['list', 'create', 'update', 'findById', 'delete', 'deleteRange'],
    newModule: 'contact',
    status: 'pending',
    notes: ['Follow same list and validation patterns as company'],
  },
  {
    legacy: 'InventoryController',
    legacyRoutes: ['list', 'create', 'update', 'findById', 'delete', 'deleteRange'],
    newModule: 'inventory',
    status: 'pending',
    notes: ['Validate complex filter payload before migration'],
  },
  {
    legacy: 'QuoteController',
    legacyRoutes: ['list', 'create', 'update', 'findById', 'delete', 'deleteRange'],
    newModule: 'quote',
    status: 'pending',
    notes: ['Likely most complex module; map carefully before implementation'],
  },
  {
    legacy: 'TaskController',
    legacyRoutes: ['list', 'create', 'update', 'findById', 'delete'],
    newModule: 'task',
    status: 'pending',
    notes: ['Simple CRUD pattern; should be straightforward'],
  },
  {
    legacy: 'NoteController',
    legacyRoutes: ['list', 'create', 'update', 'findById', 'delete'],
    newModule: 'note',
    status: 'pending',
    notes: ['Straightforward CRUD; reuse shared CRUD conventions'],
  },
  {
    legacy: 'EmailController',
    legacyRoutes: ['send', 'template actions'],
    newModule: 'email',
    status: 'pending',
    notes: ['Needs mail service abstraction before migration'],
  },
  {
    legacy: 'UserController',
    legacyRoutes: ['profile', 'updateProfile', 'list'],
    newModule: 'user',
    status: 'pending',
    notes: ['Profile and account management logic should be migrated after auth'],
  },
];

const summary = {
  total: migrationPlan.length,
  done: migrationPlan.filter((item) => item.status === 'done').length,
  pending: migrationPlan.filter((item) => item.status === 'pending').length,
};

console.log('SCP Portal Migration Status');
console.log('===========================');
console.log(`Total modules: ${summary.total}`);
console.log(`Completed: ${summary.done}`);
console.log(`Pending: ${summary.pending}`);
console.log('');

for (const item of migrationPlan) {
  console.log(`${item.status === 'done' ? '✅' : '⏳'} ${item.newModule.toUpperCase()} (${item.legacy})`);
  console.log(`   Routes: ${item.legacyRoutes.join(', ')}`);
  console.log(`   Notes: ${item.notes.join(' | ')}`);
  console.log('');
}
