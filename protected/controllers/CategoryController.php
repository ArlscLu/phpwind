<?php

class CategoryController extends ControllerChild {

    /**
     * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
     * using two-column layout. See 'protected/views/layouts/column2.php'.
     */
    public $layout = 'main_layout';

    /**
     * @return array action filters
     */
    
    public function filters() {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
        if (Yii::app()->user->aUserData['roleType'] == 'A') {
            $arr = array('admin', 'create', 'update', 'delete', 'status', 'index', 'view', 'saveordervalue', 'updategridorder', 'showstatus', 'version', 'rollback', 'deleteversion', 'viewversion');    // give all access to admin
        }

        return array(
            array('allow', // allow all users to perform 'index' and 'view' actions
                'actions' => $arr,
                'users' => array('@'),
            ),
            array('deny', // deny all users
                'users' => array('*'),
            ),
        );
    }

    /**
     * Displays a particular model.
     * @param integer $id the ID of the model to be displayed
     */
    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id),
        ));
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     */
    public function actionCreate() {
        $model = new Category;
        $modelVersion = new Categoryversion;
        $path = Yii::app()->basePath . '/../images/upload/category/';
        $rnd = time();

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Category'])) {

            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->attributes = $_POST['Category'];
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->show_status = 'U';
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */

            $model->attributes = $_POST['Category'];
            $getOrederNumber = $model->getLastOrderNumber();
            $model->order_by = $getOrederNumber;
            $model->created_date = new CDbExpression('NOW()');
            $model->updated_date = new CDbExpression('NOW()');
             $model->show_status = 'U';
            $getCategoryDetail = Category::model()->findAllByAttributes(array('category_title_eng' => $_POST['Category']['category_title_eng']));
            if (empty($getCategoryDetail)) {
                $model->category_slug = preg_replace('/\s+/', '-', strtolower($_POST['Category']['category_title_eng']));
                $modelVersion->category_slug = preg_replace('/\s+/', '-', strtolower($_POST['Category']['category_title_eng']));
                if (@!empty($_FILES['Category']['name']['cate_image'])) {
                    $imageUploadFileE = CUploadedFile::getInstance($model, 'cate_image');
                    $fileNameE = "{$rnd}-{$imageUploadFileE}";
                    $model->cate_image = $fileNameE;
                    /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                    $modelVersion->cate_image = $fileNameE;
                    /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                    if ($model->save()) {
                        /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                        $modelVersion->category_id = $model->id;
                        $modelVersion->insert(true);
                        /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                        $imageUploadFileE->saveAs($path . $fileNameE);
                        Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Category has been successfully created.")));
                        echo true;
                        exit();
                    }
                }
            } else {
                Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "Category name already exist in system, please try with another!")));
                echo false;
                exit();
            }
        }

        $this->render('create', array(
            'model' => $model,
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id the ID of the model to be updated
     */
    public function actionUpdate($id) {
        $model = $this->loadModel($id);
        $modelVersion = new Categoryversion;
        $modelVersion->attributes = $model->attributes;
        $path = Yii::app()->basePath . '/../images/upload/category/';
        $rnd = time();
        if (isset($_POST['Category'])) {
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->cate_image = $model->cate_image;
            $modelVersion->category_slug = $model->category_slug;
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->show_status = 'U';
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */

            $_POST['Category']['cate_image'] = $model->cate_image;
            $model->updated_date = new CDbExpression('NOW()');
            $model->attributes = $_POST['Category'];
            $model->show_status = 'U';
//            $model->order_by = $_POST['Category']['order_by'];
            $getCategoryDetail = Category::model()->findAllValue(array('category_title_eng' => $_POST['Category']['category_title_eng'], 'id' => $id));
            if (empty($getCategoryDetail)) {
                $model->category_slug = preg_replace('/\s+/', '-', strtolower($_POST['Category']['category_title_eng']));
                if (@!empty($_FILES['Category']['name']['cate_image'])) {
                    $imageUploadFileE = CUploadedFile::getInstance($model, 'cate_image');
                    $fileNameE = "{$rnd}-{$imageUploadFileE}";
                    $model->cate_image = $fileNameE;
                    if ($model->save()) {
                        $imageUploadFileE->saveAs($path . $fileNameE);
                    }
                }
                $model->save();
                /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                $modelVersion->category_id = $model->id;
                $modelVersion->insert(true);
                /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Category has been successfully updated.")));
                echo true;
                exit();
            } else {
                Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "Category name already exist in system, please try with another!")));
                echo false;
                exit();
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id the ID of the model to be deleted
     */
    public function actionDelete($id, $order) {
        $getDetail = Product::model()->findAllByAttributes(array('category_id' => $id));
        if (!empty($getDetail)) {
            echo 1;
        } else {
            if ($order > 0) {
                $criteria = new CDbCriteria();
                $criteria->condition = 'order_by > :order_byC';
                $criteria->params = array(':order_byC' => $order);
                $criteria->order = 'order_by ASC';
                $getBannerDetail = Category::model()->findAll($criteria);
                $finalValue = $order;
                foreach ($getBannerDetail AS $value) {
                    if ($value->id != $id) {
                        Category::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                    }

                    $finalValue++;
                }
            }
            try {
                $sCategoryImage = Category::model()->findByAttributes(array('id' => $id));
                @unlink(ROOTPATH . '/images/upload/category/' . $sCategoryImage->cate_image);
                $this->loadModel($id)->delete();
            } catch (Exception $e) {
                echo $e->getMessage();
                die;
            }
        }



        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Category');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Category('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Category']))
            $model->attributes = $_GET['Category'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Category the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Category::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param Category $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'category-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    public function actionStatus($id, $status) {

        Category::model()->updateByPk($id, array('status' => $status));
    }

    public function actionSaveordervalue() {
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $id = Yii::app()->getRequest()->getPost('id');
            $value = Yii::app()->getRequest()->getParam('value');
            Category::model()->updateByPk($id, array('order_by' => $value, 'updated_date' => new CDbExpression('NOW()')));
        }
    }

    public function actionUpdategridorder() {
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $id = Yii::app()->getRequest()->getPost('id');
            $proposedOrder = Yii::app()->getRequest()->getParam('pv');
            $currentOrder = Yii::app()->getRequest()->getParam('cv');
            $getProposedOrderDetail = Category::model()->findAllByAttributes(array('order_by' => $proposedOrder));
            if (!empty($getProposedOrderDetail)) {
                if ($currentOrder > $proposedOrder) {
                    $criteria = new CDbCriteria();
                    $criteria->condition = 'order_by < :order_byC AND order_by >= :order_byP';
                    $criteria->params = array(':order_byC' => $currentOrder, ':order_byP' => $proposedOrder);
                    $criteria->order = 'order_by ASC';
                    $getBannerDetail = Category::model()->findAll($criteria);
                    $finalValue = $proposedOrder + 1;
                    foreach ($getBannerDetail AS $value) {
                        if ($currentOrder > $proposedOrder && $value->id != $id) {
                            Category::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                        }

                        $finalValue++;
                    }
                    Category::model()->updateByPk($id, array('order_by' => $proposedOrder, 'updated_date' => new CDbExpression('NOW()')));
                } else if ($currentOrder < $proposedOrder) {
                    $criteria = new CDbCriteria();
                    $criteria->condition = 'order_by > :order_byC AND order_by <= :order_byP';
                    $criteria->params = array(':order_byC' => $currentOrder, ':order_byP' => $proposedOrder);
                    $criteria->order = 'order_by DESC';
                    $getBannerDetail = Category::model()->findAll($criteria);
                    $finalValue = $proposedOrder - 1;
                    foreach ($getBannerDetail AS $value) {
                        if ($currentOrder < $proposedOrder && $value->id != $id) {
                            Category::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                        }

                        $finalValue--;
                    }
                    Category::model()->updateByPk($id, array('order_by' => $proposedOrder, 'updated_date' => new CDbExpression('NOW()')));
                }
            } else {
                echo "false";
                die;
            }
        }
    }

    /* ----------------------------------------- Start Versioning Changes ------------------------------------- */

    public function actionVersion($id) {
        $model = new Categoryversion('search');
        $model->unsetAttributes();
        if (isset($_GET['Version']))
            $model->attributes = $_GET['Version'];

        $this->render('version', array(
            'model' => $model, 'id' => $id
        ));
    }

    public function actionRollback($id, $bid) {
        $modelVersion = Categoryversion::model()->findByPk($id);
        $modelBanner = Category::model()->findByPk($bid);
        $arr = $modelVersion->attributes;
        $arr['id'] = $modelVersion->category_id;
        $arr['order_by'] = $modelBanner->order_by;
        Category::model()->updateByPk($bid, $arr);
        
        /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
        $version = new Categoryversion;
        $version->attributes = $modelBanner->attributes;
        $version->created_date = new CDbExpression('NOW()');
        $version->category_id = $bid;
        $version->updated_date = new CDbExpression('NOW()');
        $version->cate_image = $modelBanner->cate_image;
        $version->category_slug = $modelBanner->category_slug;
        $version->show_status = 'U';
        $version->insert(true);
        /* ------------------------------ End Versin Model Save data ------------------------------------------ */
    }

    public function actionViewversion($id) {
        $this->render('viewversion', array(
            'model' => $this->loadModelVersion($id),
        ));
    }

    public function actionDeleteversion($id) {

        $this->loadModelVersion($id)->delete();
        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    public function actionShowstatus($id, $showstatus) {

        Category::model()->updateByPk($id, array('show_status' => $showstatus));
    }

    public function loadModelVersion($id) {
        $model = Categoryversion::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /* ----------------------------------------- End Versioning Changes ------------------------------------- */
}
