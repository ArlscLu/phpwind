<?php

/**
 * This is the model class for table "{{product}}".
 *
 * The followings are the available columns in table '{{product}}':
 * @property integer $id
 * @property integer $category_id
 * @property string $product_title_eng
 * @property string $product_title_chi
 * @property string $product_image
 * @property string $product_image_resize
 * @property string $status
 * @property string $is_delete
 * @property string $created_date
 * @property string $updated_date
 * @property string $case_diameter_E
 * @property string $case_diameter_C
 * @property string $case_E
 * @property string $case_C
 * @property string $dial_color_E
 * @property string $dial_color_C
 * @property string $water_resistent_E
 * @property string $water_resistent_C
 */
class Product extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{product}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('category_id, product_title_eng, product_title_chi, product_image, status, case_diameter_E, case_diameter_C, case_E, case_C, dial_color_E, dial_color_C, water_resistent_E, water_resistent_C,product_model_eng,product_model_chi', 'required'),
            array('category_id', 'numerical', 'integerOnly' => true),
            array('product_title_eng, product_title_chi, product_image, case_diameter_E, case_diameter_C, case_E, case_C, dial_color_E, dial_color_C, water_resistent_E, water_resistent_C', 'length', 'max' => 100),
            array('status', 'length', 'max' => 1),
            array('created_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            array('updated_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'update'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, category_id, product_title_eng, product_title_chi, product_image, product_image_resize, status, is_delete, created_date, updated_date, case_diameter_E, case_diameter_C, case_E, case_C, dial_color_E, dial_color_C, water_resistent_E, water_resistent_C', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array('category' => array(self::BELONGS_TO, 'Category', 'category_id'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'ID',
            'category_id' => 'Category',
            'product_title_eng' => 'Product Title (EN)',
            'product_title_chi' => 'Product Title (CN)',
            'product_model_eng' => 'Product Model (EN)',
            'product_model_chi' => 'Product Model (CN)',
            'product_image' => 'Product Image',
            'product_image_resize' => 'Product Image (Thumbnail)',
            'status' => 'Status',
            'is_delete' => 'Is Delete',
            'created_date' => 'Date Created',
            'updated_date' => 'Updated Date',
            'case_diameter_E' => 'Case Diameter (EN)',
            'case_diameter_C' => 'Case Diameter (CN)',
            'case_E' => 'Case (EN)',
            'case_C' => 'Case (CN)',
            'dial_color_E' => 'Dial Color (EN)',
            'dial_color_C' => 'Dial Color (CN)',
            'water_resistent_E' => 'Water Resistent (EN)',
            'water_resistent_C' => 'Water Resistent (CN)',
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
        $criteria->compare('category_id', $this->category_id);
        $criteria->compare('product_title_eng', $this->product_title_eng, true);
        $criteria->compare('product_title_chi', $this->product_title_chi, true);
        $criteria->compare('product_image', $this->product_image, true);
        $criteria->compare('product_image_resize', $this->product_image_resize, true);
        $criteria->compare('status', $this->status, true);
        $criteria->compare('is_delete', $this->is_delete, true);
        $criteria->compare('created_date', $this->created_date, true);
        $criteria->compare('updated_date', $this->updated_date, true);
        $criteria->compare('case_diameter_E', $this->case_diameter_E, true);
        $criteria->compare('case_diameter_C', $this->case_diameter_C, true);
        $criteria->compare('case_E', $this->case_E, true);
        $criteria->compare('case_C', $this->case_C, true);
        $criteria->compare('dial_color_E', $this->dial_color_E, true);
        $criteria->compare('dial_color_C', $this->dial_color_C, true);
        $criteria->compare('water_resistent_E', $this->water_resistent_E, true);
        $criteria->compare('water_resistent_C', $this->water_resistent_C, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
            'sort' => array(
                'defaultOrder' => 'category_id ASC,order_by ASC',
            ),
            'pagination' => array('pageSize' => Yii::app()->params['PAGESIZE'],),
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Product the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    public function getProductListing($args, $cookieLangType) {

        if (strtolower($cookieLangType) == Yii::app()->params['ENGLISH']) {
            $query = Yii::app()->db->createCommand()->select('pro.id as product_id,pro.product_title_eng as product_title,pro.product_image as product_image,pro.product_model_eng as model')->from('tbl_product pro')
                    ->where('status=' . "'1'")
                    ->andWhere('category_id=' . $args['category_id'])
                    ->order(array('order_by asc', 'created_date desc'));
            if (!Yii::app()->user->isGuest && Yii::app()->user->aUserData['roleType'] == 'A') {
                
            } else {
                $query->andWhere('show_status=' . "'P'");
            }
            if (!empty($args['limit']) || !empty($args['offset'])) {
                $query->limit($args['limit']);
                $query->offset($args['offset']);
            }
            if (!empty($args['sInterFaceType']) && $args['sInterFaceType'] == 'web') {
                $query->limit(6);
            }
            if (!empty($args['sInterFaceType']) && $args['sInterFaceType'] == 'mobile') {
                $query->limit(2);
            }
        } else if (strtolower($cookieLangType) == Yii::app()->params['CHINESE']) {
            $query = Yii::app()->db->createCommand()->select('pro.id as product_id,pro.product_title_chi as product_title,pro.product_image as product_image,pro.product_model_chi as model')->from('tbl_product pro')
                    ->where('status=' . "'1'")
                    ->andWhere('category_id=' . $args['category_id'])
                    ->order(array('order_by asc', 'created_date desc'));
            if (!Yii::app()->user->isGuest && Yii::app()->user->aUserData['roleType'] == 'A') {
                
            } else {
                $query->andWhere('show_status=' . "'P'");
            }
            if (!empty($args['limit']) || !empty($args['offset'])) {
                $query->limit($args['limit']);
                $query->offset($args['offset']);
            }
            if (!empty($args['sInterFaceType']) && $args['sInterFaceType'] == 'web') {
                $query->limit(6);
            }
            if (!empty($args['sInterFaceType']) && $args['sInterFaceType'] == 'mobile') {
                $query->limit(2);
            }
        }
        $result = $query->queryAll();
        if (count($result) > 0) {
            return $result;
        } else {
            return false;
        }
    }

    public function getProductDetail($args, $cookieLangType) {
        if (strtolower($cookieLangType) == Yii::app()->params['ENGLISH']) {
            $query = Yii::app()->db->createCommand()->select('pro.id as product_id,pro.category_id as category_id,pro.product_title_eng as product_title,pro.product_image as product_image,pro.case_diameter_E as case_diameter,pro.case_E as case,pro.dial_color_E as dial_color,pro.water_resistent_E as water_resistent,pro.product_model_eng as model')->from('tbl_product pro')
                    ->where('status=' . "'1'")
                    ->andWhere('id=' . $args['product_id']);
        } else if (strtolower($cookieLangType) == Yii::app()->params['CHINESE']) {
            $query = Yii::app()->db->createCommand()->select('pro.id as product_id,pro.category_id as category_id,pro.product_title_chi as product_title,pro.product_image as product_image,pro.case_diameter_C as case_diameter,pro.case_C as case,pro.dial_color_C as dial_color,pro.water_resistent_C as water_resistent,pro.product_model_chi as model')->from('tbl_product pro')
                    ->where('status=' . "'1'")
                    ->andWhere('id=' . $args['product_id']);
        }
//        echo $query->text;  die;
        $result = $query->queryRow();

        if (count($result) > 0) {
            return $result;
        } else {
            return false;
        }
    }

    public function getProductListingCategoryWise($args, $cookieLangType) {
        if (strtolower($cookieLangType) == Yii::app()->params['ENGLISH']) {
            $query = Yii::app()->db->createCommand()
                    ->select('c.category_slug as slug,pro.id as product_id,pro.category_id as cate_id,pro.product_title_eng as product_title,pro.product_image as product_image,pro.product_model_eng as model')->from('tbl_product pro')
                    ->join('tbl_category c', 'pro.category_id=c.id')
                    ->where('pro.status=' . "'1'");
            if (!Yii::app()->user->isGuest && Yii::app()->user->aUserData['roleType'] == 'A') {
                
            } else {
                $query->andWhere('pro.show_status=' . "'P'");
            }
            if (!empty($args['category_id'])) {
                $query->andwhere('category_id=' . $args['category_id']);
            }
            if (!empty($args['product_id'])) {
                $query->andwhere('pro.id!=' . $args['product_id']);
            }
        } else if (strtolower($cookieLangType) == Yii::app()->params['CHINESE']) {
            $query = Yii::app()->db->createCommand()->select('c.category_slug as slug,pro.id as product_id,pro.category_id as cate_id,pro.product_title_chi as product_title,pro.product_image as product_image,pro.product_model_chi as model')->from('tbl_product pro')
                    ->join('tbl_category c', 'pro.category_id=c.id')
                    ->where('pro.status=' . "'1'");
            if (!Yii::app()->user->isGuest && Yii::app()->user->aUserData['roleType'] == 'A') {
                
            } else {
                $query->andWhere('pro.show_status=' . "'P'");
            }
            if (!empty($args['product_id'])) {
                $query->andwhere('pro.id!=' . $args['product_id']);
            }
            if (!empty($args['category_id'])) {
                $query->andwhere('category_id=' . $args['category_id']);
            }
        }
        $result = $query->queryAll();
        if (count($result) > 0) {
            return $result;
        } else {
            return false;
        }
    }

    public function findAllValue($args) {
        $title = $args['product_model_eng'];
        $query = Yii::app()->db->createCommand()->select('*')->from('tbl_product pro')
                ->where('status=' . "'1'")
                ->andWhere('id!=' . $args['id'])
                ->andWhere('product_model_eng= ' . "'$title'");
        $result = $query->queryAll();
        if (count($result) > 0) {
            return $result;
        } else {
            return false;
        }
    }

    public function getLastOrderNumber($iCatID) {
        $query = Yii::app()->db->createCommand()
                ->select('order_by')
                ->from('tbl_product')
                ->where('category_id=' . $iCatID)
                ->order('order_by desc')
                ->limit(1);
        $result = $query->queryRow();
        if (count($result) > 0) {
            return $result['order_by'] + 1;
        } else {
            return 1;
        }
    }

}
