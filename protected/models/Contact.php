<?php

/**
 * This is the model class for table "{{contact}}".
 *
 * The followings are the available columns in table '{{contact}}':
 * @property integer $id
 * @property string $name
 * @property string $email
 * @property string $address
 * @property string $status
 * @property string $type
 * @property string $created_date
 * @property string $updated_date
 */
class Contact extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{contact}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('name, email,mobile ,message, status, type', 'required'),
            array('name, email, message', 'length', 'max' => 255),
            array('status', 'length', 'max' => 1),
            array('type', 'length', 'max' => 3),
            array('created_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            array('updated_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'update'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, name, email, message, status, type, created_date, updated_date', 'safe', 'on' => 'search'),
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
            'name' => 'Name',
            'email' => 'Email',
            'message' => 'Message',
            'status' => 'Status',
            'type' => 'Type',
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
    public function search() {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id);
        $criteria->compare('name', $this->name, true);
        $criteria->compare('email', $this->email, true);
        $criteria->compare('mobile', $this->mobile, true);
        $criteria->compare('message', $this->message, true);
        $criteria->compare('status', $this->status, true);
        $criteria->compare('type', $this->type, true);
        $criteria->compare('created_date', $this->created_date, true);
        $criteria->compare('updated_date', $this->updated_date, true);

        return new CActiveDataProvider($this, array(
                    'criteria' => $criteria, 'pagination' => array('pageSize' => Yii::app()->params['PAGESIZE'],),
                ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Contact the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    public function getContactList($arg) {
//        $query = "select * from tbl_contact as con ";
//        $query = Yii::app()->db->select()->from(array('con' => 'tbl_contact'), array('*'));
        $query = Yii::app()->db->createCommand()->select('*')->from('tbl_contact con');


        if (!empty($arg['nameP'])) {

            $query->where('name=:name', array(':name' => $arg['nameP']));
        }
        if (!empty($arg['mobileP'])) {
            $query->where('mobile=:mobile', array(':mobile' => $arg['mobileP']));
        }
        if (!empty($arg['typeP'])) {
            $query->where('type=:type', array(':type' => $arg['typeP']));
        }
        $result = $query->queryAll();

        if (count($result) > 0) {
            return $result;
        } else {
            return false;
        }
    }

    public function insertContactData($postData, $cookieLangType) {
        if (strtolower($cookieLangType) == Yii::app()->params['ENGLISH']) {
            $type = 'ENG';
        } if (strtolower($cookieLangType) == Yii::app()->params['CHINESE']) {
            $type = 'CHI';
        }
        $name = (!empty($postData['name']) ? $postData['name'] : '');
        $email = (!empty($postData['email']) ? $postData['email'] : '');
        $contactnumber = (!empty($postData['contactnumber']) ? $postData['contactnumber'] : '');
        $message = (!empty($postData['message']) ? $postData['message'] : '');
        $contact = new Contact;
        $contact->name = $name;
        $contact->email = $email;
        $contact->mobile = $contactnumber;
        $contact->message = $message;
        $contact->type = $type;
        $contact->status = 1;
        $contact->created_date = new CDbExpression('NOW()');
        $contact->updated_date = new CDbExpression('NOW()');
        $returnValue =$contact->save();
        return $returnValue;
    }

}

