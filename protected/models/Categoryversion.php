<?php

/**
 * This is the model class for table "{{category}}".
 *
 * The followings are the available columns in table '{{category}}':
 * @property integer $id
 * @property string $category_title_eng
 * @property string $category_title_chi
 * @property string $cate_image
 * @property string $status
 * @property string $is_delete
 * @property string $created_date
 * @property string $updated_date
 */
class Categoryversion extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{category_version}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('category_title_eng, category_title_chi,category_name_eng,category_name_chi', 'required'),
            array('category_title_eng, category_title_chi', 'length', 'max' => 100),
            array('status', 'length', 'max' => 1),
            array('created_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            array('updated_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'update'),
            array('cate_image', 'file', 'types' => 'jpg,jpeg, gif, png', 'on' => 'insert', 'allowEmpty' => false, 'message' => 'Please browse category image'),
            array('cate_image', 'file', 'types' => 'jpg,jpeg, gif, png', 'on' => 'update', 'allowEmpty' => true),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, category_title_eng, category_title_chi, cate_image, status, is_delete, created_date, updated_date', 'safe', 'on' => 'search'),
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
            'category_title_eng' => 'Collection Title (EN)',
            'category_title_chi' => 'Collection Title (CN)',
            'category_name_chi' => 'Collection Name (CN)',
            'category_name_eng' => 'Collection Name (EN)',
            'cate_image' => 'Image',
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
        $criteria->compare('category_id', $this->category_id);
        $criteria->compare('category_title_eng', $this->category_title_eng, true);
        $criteria->compare('category_title_chi', $this->category_title_chi, true);
        $criteria->compare('category_name_eng', $this->category_name_eng, true);
        $criteria->compare('category_name_chi', $this->category_name_chi, true);
        $criteria->compare('cate_image', $this->cate_image, true);
        $criteria->compare('status', $this->status, true);
        $criteria->compare('is_delete', $this->is_delete, true);
        $criteria->compare('created_date', $this->created_date, true);
        $criteria->compare('updated_date', $this->updated_date, true);
        $criteria->condition = ' category_id= :category_id';
        $criteria->params = array(':category_id' => $id);
        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
            'pagination' => array('pageSize' => Yii::app()->params['PAGESIZE'],),
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Category the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

  

   

}
