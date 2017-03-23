var IndexedDB = function() {};

IndexedDB.prototype.open = function() {

    /**
    * @const object schema mapping schema
    */
    const schema = {mapping:'++id,key,value'};

    /** 定義Client資料庫 **/
    this.db = new Dexie('coder');

    /** 建立版本1的資料庫 **/
    this.db.version(1).stores(schema);

    this.db.open().catch(function (e) {
        /** 資料庫開啟失敗時 **/
        console.log(e);
    });
}

IndexedDB.prototype.getMappingByKey = function(key) {
    return this.db.mapping.where('key').equals(key).toArray();
}

IndexedDB.prototype.addMapping = function(data) {
    /** 開啟Transaction 進行新增資料 **/
    return this.db.transaction('rw', this.db.mapping, function() {
        for(key in data) {
            this.mapping.add(data[key]);
        }
    }).then(function(result) {
        /** 成功committed時 **/
    }).catch(function(error) {
        /** 失敗時 **/
    });
}
