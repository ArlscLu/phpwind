<?php

/**
 * This is the model class for table "{{store}}".
 *
 * The followings are the available columns in table '{{store}}':
 * @property integer $id
 * @property string $city_eng
 * @property string $city_chi
 * @property string $shop_name_eng
 * @property string $shop_name_chi
 * @property string $address_eng
 * @property string $address_chi
 * @property string $status
 * @property string $is_delete
 * @property string $created_date
 * @property string $updated_date
 */
class Storeversion extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{store_version}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('city_eng, city_chi, shop_name_eng, shop_name_chi, address_eng, address_chi', 'required'),
            array('city_eng, city_chi, shop_name_eng', 'length', 'max' => 100),
            array('shop_name_chi, address_eng, address_chi', 'length', 'max' => 255),
            array('status, is_delete', 'length', 'max' => 1),
            array('created_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            array('updated_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'update'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, city_eng, city_chi, shop_name_eng, shop_name_chi, address_eng, address_chi, status, is_delete, created_date, updated_date', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'ID',
            'city_eng' => 'City (EN)',
            'city_chi' => 'City (CN)',
            'shop_name_eng' => 'Shop Name (EN)',
            'shop_name_chi' => 'Shop Name (CN)',
            'address_eng' => 'Address (EN)',
            'address_chi' => 'Address (CN)',
            'status' => 'Status',
            'is_delete' => 'Is Delete',
            'created_date' => 'Date Created',
            'updated_date' => 'Updated Date',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     *
     * Typical usecase:
     * - Initialize the model fields with values from filter form.
     * - Execute this method to get CActiveDataProvider instance which will filter
     * models according to data in model fields.
     * - Pass data provider to CGridView, CListView or any similar widget.
     *
     * @return CActiveDataProvider the data provider that can return the models
     * based on the search/filter conditions.
     */
    public function search($id) {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id);
        $criteria->compare('store_id', $this->store_id);
        $criteria->compare('city_eng', $this->city_eng, true);
        $criteria->compare('city_chi', $this->city_chi, true);
        $criteria->compare('shop_name_eng', $this->shop_name_eng, true);
        $criteria->compare('shop_name_chi', $this->shop_name_chi, true);
        $criteria->compare('address_eng', $this->address_eng, true);
        $criteria->compare('address_chi', $this->address_chi, true);
        $criteria->compare('status', $this->status, true);
        $criteria->compare('is_delete', $this->is_delete, true);
        $criteria->compare('created_date', $this->created_date, true);
        $criteria->compare('updated_date', $this->updated_date, true);
        $criteria->condition = ' store_id= :store_id';
        $criteria->params = array(':store_id' => $id);

        return new CActiveDataProvider($this, array(
                    'criteria' => $criteria, 'pagination' => array('pageSize' => Yii::app()->params['PAGESIZE'],),
                ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Store the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

  

}

