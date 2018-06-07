<?php

/**
 * This is the model class for table "{{content}}".
 *
 * The followings are the available columns in table '{{content}}':
 * @property integer $id
 * @property string $content_title_E
 * @property string $content_title_C
 * @property string $content_E
 * @property string $content_C
 * @property string $status
 * @property string $created_date
 * @property string $updated_date
 */
class Content extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{content}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('content_title_E, content_title_C, content_E, content_C', 'required'),
            array('content_title_E, content_title_C', 'length', 'max' => 255),
            array('status', 'length', 'max' => 1),
            array('created_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            array('updated_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'update'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, content_title_E, content_title_C, content_E, content_C, status, created_date, updated_date', 'safe', 'on' => 'search'),
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
            'content_title_E' => 'Content Title (EN)',
            'content_title_C' => 'Content Title (CN)',
            'content_E' => 'Content (EN)',
            'content_C' => 'Content (CN)',
            'content_title_E_A' => 'Content Title (EN) for Admin',
            'content_title_C_A' => 'Content Title (CN) for Admin',
            'content_E_A' => 'Content (EN) for Admin',
            'content_C_A' => 'Content (CN) for Admin ',
            'status' => 'Status',
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
        $criteria->compare('content_title_E', $this->content_title_E, true);
        $criteria->compare('content_title_C', $this->content_title_C, true);
        $criteria->compare('content_E', $this->content_E, true);
        $criteria->compare('content_C', $this->content_C, true);
        $criteria->compare('status', $this->status, true);
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
     * @return Content the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    public function getContent($args, $cookieLangType) {

        $slug = $args['slug'];
        if (!Yii::app()->user->isGuest && Yii::app()->user->aUserData['roleType'] == 'A') {
            if (strtolower($cookieLangType) == Yii::app()->params['ENGLISH']) {
                $query = Yii::app()->db->createCommand()->select('c.id as content_id,c.content_title_E_A as content_title,c.content_E_A as content')->from('tbl_content c')
                        ->where('c.slug=' . "'$slug'")
                        ->andWhere('c.status=' . "'1'");
            } else if (strtolower($cookieLangType) == Yii::app()->params['CHINESE']) {
                $query = Yii::app()->db->createCommand()->select('c.id as content_id,c.content_title_C_A as content_title,c.content_C_A as content')->from('tbl_content c')
                        ->where('c.slug=' . "'$slug'")
                        ->andWhere('c.status=' . "'1'");
            }
        } else {
            if (strtolower($cookieLangType) == Yii::app()->params['ENGLISH']) {
                $query = Yii::app()->db->createCommand()->select('c.id as content_id,c.content_title_E as content_title,c.content_E as content')->from('tbl_content c')
                        ->where('c.slug=' . "'$slug'")
                        ->andWhere('c.status=' . "'1'");
            } else if (strtolower($cookieLangType) == Yii::app()->params['CHINESE']) {
                $query = Yii::app()->db->createCommand()->select('c.id as content_id,c.content_title_C as content_title,c.content_C as content')->from('tbl_content c')
                        ->where('c.slug=' . "'$slug'")
                        ->andWhere('c.status=' . "'1'");
            }
        }
        $result = $query->queryRow();
        if (count($result) > 0) {
            return $result;
        } else {
            return false;
        }
    }

}
