<?php

/**
 * This is the model class for table "{{banner}}".
 *
 * The followings are the available columns in table '{{banner}}':
 * @property integer $id
 * @property string $banner_title_eng
 * @property string $banner_title_chi
 * @property string $banner_image_eng
 * @property string $banner_image_chi
 * @property integer $product_page
 * @property integer $category_page
 * @property string $status
 * @property string $is_delete
 * @property string $created_date
 * @property string $updated_date
 */
class Version extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{banner_version}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('banner_title_eng, banner_title_chi,product_page, category_page, status', 'required'),
            array('product_page, category_page', 'numerical', 'integerOnly' => true),
            array('banner_title_eng, banner_title_chi', 'length', 'max' => 100),
            array('status', 'length', 'max' => 2),
            array('is_delete', 'length', 'max' => 1),
            array('banner_image_eng,banner_image_chi', 'file', 'types' => 'jpg,jpeg, gif, png', 'on' => 'insert', 'allowEmpty' => false, 'message' => 'Please browse Bann image'),
            array('banner_image_eng,banner_image_chi', 'file', 'types' => 'jpg,jpeg, gif, png', 'on' => 'update', 'allowEmpty' => true),
            array('created_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            array('updated_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'update'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, banner_title_eng, banner_title_chi,  banner_image_eng, banner_image_chi, product_page, category_page, status, is_delete, created_date, updated_date', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array('category' => array(self::BELONGS_TO, 'Category', 'category_page'),
            'product' => array(self::BELONGS_TO, 'Product', 'product_page'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'ID',
            'banner_title_eng' => 'Banner Title (EN)',
            'banner_title_chi' => 'Banner Title (CN)',
            'banner_image_eng' => 'Img Desc (EN)',
            'banner_image_chi' => 'Img Desc (CN)',
            'product_page' => 'Product Page',
            'category_page' => 'Category Page',
            'created_date' => 'Date Created',
            'status' => 'Status',
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
        $criteria->compare('banner_id', $this->banner_id);
        $criteria->compare('banner_title_eng', $this->banner_title_eng, true);
        $criteria->compare('banner_title_chi', $this->banner_title_chi, true);
        $criteria->compare('banner_image_eng', $this->banner_image_eng, true);
        $criteria->compare('banner_image_chi', $this->banner_image_chi, true);
        $criteria->compare('product_page', $this->product_page);
        $criteria->compare('category_page', $this->category_page);
        $criteria->compare('status', $this->status, true);
        $criteria->compare('show_status', $this->show_status, true);
        $criteria->compare('is_delete', $this->is_delete, true);
        $criteria->compare('created_date', $this->created_date, true);
        $criteria->compare('updated_date', $this->updated_date, true);
        $criteria->condition = ' banner_id= :banner_id';
        $criteria->params = array(':banner_id' => $id);
        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
            
            'pagination' => array('pageSize' => Yii::app()->params['PAGESIZE'],),
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Banner the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

   

}
