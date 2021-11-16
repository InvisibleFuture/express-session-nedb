export default function (session, db) {
  function NedbStore(options, callback=()=>{}) {
    this.db = db;
    this.db.loadDatabase(callback);
  }
  NedbStore.prototype.__proto__ = session.Store.prototype;
  NedbStore.prototype.get = function (sid, callback) {
    this.db.findOne({ sid: sid }, function (err, sess) {
      return callback(err, sess ? sess.data : null )
    });
  };
  NedbStore.prototype.set = function (sid, data, callback) {
    this.db.update({ sid: sid }, { sid: sid, data: data }, { multi: false, upsert: true }, function (err) {
      return callback(err);
    });
  };
  NedbStore.prototype.destroy = function (sid, callback) {
    this.db.remove({ sid: sid }, { multi: false }, function (err) {
      return callback(err);
    });
  };
  return new NedbStore();
}
