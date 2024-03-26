const SubscriptionType = require('./models/subscriptionType');
const Subscription = require('./models/subscription');
const User = require('./models/user');
const Cheque = require('./models/cheque');
const ChequeType = require('./models/chequeType');
const File = require('./models/file');
const FileType = require('./models/fileType');
const Country = require('./models/country');
const Task = require('./models/task');
const TaskComment = require('./models/taskComment');
const TaskStatus = require('./models/taskStatus');
const TaskJournal = require('./models/taskJournal');
const UserRole = require('./models/userRole');

function setupAssociations() {
    // Одна подписка типа может иметь много подписок
    SubscriptionType.hasMany(Subscription, { as: 'typedSubscriptions', foreignKey: 'subscriptionTypeId' });
    Subscription.belongsTo(SubscriptionType, { as: 'type', foreignKey: 'subscriptionTypeId' });

    // Один тип чеков может иметь много чеков
    Country.hasMany(Subscription, { as: 'countriedSubscriptions', foreignKey: 'countryId' });
    Subscription.belongsTo(Country, { as: 'country', foreignKey: 'countryId' });

    // Один пользователь может иметь много чеков
    User.hasMany(Cheque, { as: 'cheques', foreignKey: 'userId' });
    Cheque.belongsTo(User, { foreignKey: 'userId' });

    // Один тип чеков может иметь много чеков
    ChequeType.hasMany(Cheque, { as: 'cheques', foreignKey: 'chequeTypeId' });
    Cheque.belongsTo(ChequeType, { foreignKey: 'chequeTypeId' });

    // Один файл может принадлежать одному типу файла
    FileType.hasMany(File, { as: 'files', foreignKey: 'fileTypeId' });
    File.belongsTo(FileType, { foreignKey: 'fileTypeId' });

    // Один пользователь может создавать много задач
    User.hasMany(Task, { as: 'authoredTasks', foreignKey: 'authorId' });
    Task.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

    // Один пользователь может исполнять много задач
    User.hasMany(Task, { as: 'executedTasks', foreignKey: 'workerId' });
    Task.belongsTo(User, { as: 'worker', foreignKey: 'workerId' });

    // Один комментарий принадлежит одной задаче
    Task.hasMany(TaskComment, { as: 'comments', foreignKey: 'taskId' });
    TaskComment.belongsTo(Task, { as: 'task', foreignKey: 'taskId' });

    // Один журнал статусов принадлежит одной задаче
    Task.hasMany(TaskJournal, { as: 'journals', foreignKey: 'taskId' });
    TaskJournal.belongsTo(Task, { as: 'task', foreignKey: 'taskId' });

    // Один статус принадлежит одному журналу статусов
    TaskStatus.hasMany(TaskJournal, { as: 'journals', foreignKey: 'statusId' });
    TaskJournal.belongsTo(TaskStatus, { as: 'status', foreignKey: 'statusId' });

    // Один пользователь принадлежит одной стране
    Country.hasMany(User, { as: 'countriedUsers', foreignKey: 'countryId' });
    User.belongsTo(Country, { as: 'country', foreignKey: 'countryId' });

    // Один пользователь принадлежит одной роли
    UserRole.hasMany(User, { as: 'roles', foreignKey: 'userRoleId' });
    User.belongsTo(UserRole, { foreignKey: 'userRoleId' });

    // Много пользователей имеют много файлов
    User.belongsToMany(File, { through: 'UsersFiles' });
    File.belongsToMany(User, { through: 'UsersFiles' });

    // Много пользователей имеют много подписок
    User.belongsToMany(Subscription, { through: 'UserSubscriptions' });
    Subscription.belongsToMany(User, { through: 'UserSubscriptions' });
}

module.exports = setupAssociations;

/*module.exports = {
  SubscriptionType,
  Subscription,
  User,
  Cheque,
  ChequeType,
  File,
  FileType,
  Country,
  Task,
  TaskComment,
  TaskStatus,
  TaskJournal,
  UserRole
  // Другие модели, если они есть
};*/
