<?php

/**
 * This is the model class for table "{{news}}".
 *
 * The followings are the available columns in table '{{news}}':
 * @property integer $id
 * @property string $news_title_E
 * @property string $news_title_C
 * @property string $news_header_E
 * @property string $news_header_C
 * @property string $news_year
 * @property string $news_desc_E
 * @property string $news_desc_C
 * @property string $news_long_desc_E
 * @property string $news_long_desc_C
 * @property string $news_image
 * @property string $news_resize_image
 * @property string $status
 * @property string $is_deleted
 * @property string $created_date
 * @property string $updated_date
 */
class Newsversion extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{news_version}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('news_header_E, news_header_C, news_year, news_desc_E, news_desc_C, news_image, status', 'required'),
            array('news_header_E, news_header_C, news_image, news_resize_image', 'length', 'max' => 255),
            array('news_year', 'length', 'max' => 15),
            array('status, is_deleted', 'length', 'max' => 1),
            array('created_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            array('updated_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'update'),
            array('news_image', 'file', 'types' => 'jpg, gif, png', 'allowEmpty' => true, 'on' => 'update'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id,news_header_E, news_header_C, news_year, news_desc_E, news_desc_C, news_long_desc_E, news_long_desc_C, news_image, news_resize_image, status, is_deleted, created_date, updated_date', 'safe', 'on' => 'search'),
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
            'news_header_E' => 'News Header (EN)',
            'news_header_C' => 'News Header (CN)',
            'news_year' => 'News Year',
            'news_desc_E' => 'News Desc (EN)',
            'news_desc_C' => 'News Desc (CN)',
            'news_long_desc_E' => 'News Long Desc (EN)',
            'news_long_desc_C' => 'News Long Desc (CN)',
            'news_image' => 'News Image',
            'news_resize_image' => 'News Resize Image',
            'status' => 'Status',
            'is_deleted' => 'Is Deleted',
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
        $criteria->compare('news_id', $this->news_id);
        $criteria->compare('news_header_E', $this->news_header_E, true);
        $criteria->compare('news_header_C', $this->news_header_C, true);
        $criteria->compare('news_year', $this->news_year, true);
        $criteria->compare('news_desc_E', $this->news_desc_E, true);
        $criteria->compare('news_desc_C', $this->news_desc_C, true);
        $criteria->compare('news_long_desc_E', $this->news_long_desc_E, true);
        $criteria->compare('news_long_desc_C', $this->news_long_desc_C, true);
        $criteria->compare('news_image', $this->news_image, true);
        $criteria->compare('news_resize_image', $this->news_resize_image, true);
        $criteria->compare('status', $this->status, true);
        $criteria->compare('is_deleted', $this->is_deleted, true);
        $criteria->condition = ' news_id= :news_id';
        $criteria->params = array(':news_id' => $id);
        $criteria->compare('created_date', $this->created_date, true);
        $criteria->compare('updated_date', $this->updated_date, true);

        return new CActiveDataProvider($this, array(
                    'criteria' => $criteria,
                ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return News the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    

}
