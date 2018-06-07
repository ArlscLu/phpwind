<?php

class ProductController extends ControllerChild {

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
        $model = new Product;
        $modelVersion = new Productversion;
        $path = Yii::app()->basePath . '/../images/upload/product/';
        $smallpath = Yii::app()->basePath . '/../images/upload/resize/';
        $rnd = time();
        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);


        if (isset($_POST['Product'])) {
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->attributes = $_POST['Product'];
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->show_status = 'U';
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */
            $model->attributes = $_POST['Product'];
            $model->product_mrp = 0;
            $model->created_date = new CDbExpression('NOW()');
            $model->updated_date = new CDbExpression('NOW()');
            $model->product_model_chi = $_POST['Product']['product_model_eng'];
            $modelVersion->product_model_chi = $_POST['Product']['product_model_eng'];
            $getOrederNumber = $model->getLastOrderNumber($_POST['Product']['category_id']);
            $model->order_by = $getOrederNumber;
            $getProductDetail = Product::model()->findAllByAttributes(array('product_model_eng' => $_POST['Product']['product_model_eng']));
            if (empty($getProductDetail)) {
                if (@!empty($_FILES['Product']['name']['product_image'])) {

                    $percent = 0.5;
                    $imageUploadFileE = CUploadedFile::getInstance($model, 'product_image');
                    $fileNameE = "{$rnd}-{$imageUploadFileE}";
                    $model->product_image = $fileNameE;
                    $modelVersion->product_image = $fileNameE;
                    if ($model->save()) {
                        $imageUploadFileE->saveAs($path . $fileNameE);
                        $filename = stripslashes($_FILES['Product']['name']['product_image']);
                        $extension = $this->getExtension($filename);
                        if ($extension == "jpg" || $extension == "jpeg") {
                            $source = imagecreatefromjpeg($path . $fileNameE);
                        } else if ($extension == "png") {
                            $source = imagecreatefrompng($path . $fileNameE);
                        } else {
                            $source = imagecreatefromgif($path . $fileNameE);
                        }
                        list($width, $height) = getimagesize($path . $fileNameE);
                        $newwidth = $width * $percent;
                        $newheight = $height * $percent;
                        $thumb = imagecreatetruecolor($newwidth, $newheight);
                        imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
                        if ($extension == "jpg" || $extension == "jpeg") {
                            $resizeFileName = time() . '.jpg';
                            imagejpeg($thumb, $smallpath . $resizeFileName);
                        } else if ($extension == "png") {
                            $resizeFileName = time() . '.png';
                            imagepng($thumb, $smallpath . $resizeFileName);
                        } else {
                            $resizeFileName = time() . '.gif';
                            imagegif($thumb, $smallpath . $resizeFileName);
                        }
                        $model->product_image_resize = 'no';
                        $modelVersion->product_image_resize = 'no';
//                        $model->product_image_resize = $resizeFileName;
//                        $modelVersion->product_image_resize = $resizeFileName;
                        $model->save();
                        /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                        $modelVersion->product_id = $model->id;
                        $modelVersion->insert(true);
                        /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                        Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Product has been successfully created.")));
                        echo true;
                        exit();
                    }
                }
            } else {
                Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "This product model already exist in system, please try with another!")));
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
        $modelVersion = new Productversion;
        $modelVersion->attributes = $model->attributes;
        $path = Yii::app()->basePath . '/../images/upload/product/';
        $smallpath = Yii::app()->basePath . '/../images/upload/resize/';
        $rnd = time();
        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);


        if (isset($_POST['Product'])) {
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->product_image = $model->product_image;
            $modelVersion->product_image_resize = $model->product_image_resize;
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */

            $_POST['Product']['product_image'] = $model->product_image;
            $model->attributes = $_POST['Product'];
            $model->product_model_chi = $_POST['Product']['product_model_eng'];
            $model->show_status = 'U';
            // $model->product_mrp = 0;
//            $model->order_by = $_POST['Product']['order_by'];
            $getProductDetail = Product::model()->findAllValue(array('product_model_eng' => $_POST['Product']['product_model_eng'], 'id' => $id));
            if (empty($getProductDetail)) {
                if (@!empty($_FILES['Product']['name']['product_image'])) {
                    $percent = 0.5;
                    $imageUploadFileE = CUploadedFile::getInstance($model, 'product_image');
                    $fileNameE = "{$rnd}-{$imageUploadFileE}";
                    $model->product_image = $fileNameE;
                    if ($model->save()) {
                        $imageUploadFileE->saveAs($path . $fileNameE);
                        $filename = stripslashes($_FILES['Product']['name']['product_image']);
                        $extension = $this->getExtension($filename);
                        if ($extension == "jpg" || $extension == "jpeg") {
                            $source = imagecreatefromjpeg($path . $fileNameE);
                        } else if ($extension == "png") {
                            $source = imagecreatefrompng($path . $fileNameE);
                        } else {
                            $source = imagecreatefromgif($path . $fileNameE);
                        }
                        list($width, $height) = getimagesize($path . $fileNameE);
                        $newwidth = $width * $percent;
                        $newheight = $height * $percent;
                        $thumb = imagecreatetruecolor($newwidth, $newheight);
                        imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
                        if ($extension == "jpg" || $extension == "jpeg") {
                            $resizeFileName = time() . '.jpg';
                            imagejpeg($thumb, $smallpath . $resizeFileName);
                        } else if ($extension == "png") {
                            $resizeFileName = time() . '.png';
                            imagepng($thumb, $smallpath . $resizeFileName);
                        } else {
                            $resizeFileName = time() . '.gif';
                            imagegif($thumb, $smallpath . $resizeFileName);
                        }
                        $model->product_image_resize = $resizeFileName;
                    }
                }
                $model->save();
                /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                $modelVersion->product_id = $model->id;
                $modelVersion->insert(true);
                /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Product has been successfully updated.")));
                echo true;
                exit();
            } else {
                Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "This product model already exist in system, please try with another!")));
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
    public function actionDelete($id, $order, $cat) {

        if ($order > 0) {
            $criteria = new CDbCriteria();
            $criteria->condition = 'order_by > :order_byC AND category_id = :category_id';
            $criteria->params = array(':order_byC' => $order, ':category_id' => $cat);
            $criteria->order = 'order_by ASC';
            $getBannerDetail = Product::model()->findAll($criteria);
            $finalValue = $order;
            foreach ($getBannerDetail AS $value) {
                if ($value->id != $id) {
                    Product::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                }

                $finalValue++;
            }
        }
        try {
            $sProductImage = Product::model()->findByAttributes(array('id' => $id));
            @unlink(ROOTPATH . '/images/upload/product/' . $sProductImage->product_image);
            @unlink(ROOTPATH . '/images/upload/resize/' . $sProductImage->product_image_resize);
            $this->loadModel($id)->delete();
        } catch (Exception $e) {
            echo $e->getMessage();
            die;
        }

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Product');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Product('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Product']))
            $model->attributes = $_GET['Product'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Product the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Product::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param Product $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'product-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    function getExtension($str) {

        $i = strrpos($str, ".");
        if (!$i) {
            return "";
        }

        $l = strlen($str) - $i;
        $ext = substr($str, $i + 1, $l);
        return $ext;
    }

    public function actionStatus($id, $status) {

        Product::model()->updateByPk($id, array('status' => $status));
    }

    public function actionSaveordervalue() {
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $id = Yii::app()->getRequest()->getPost('id');
            $value = Yii::app()->getRequest()->getParam('value');
            Product::model()->updateByPk($id, array('order_by' => $value, 'updated_date' => new CDbExpression('NOW()')));
        }
    }

    public function actionUpdategridorder() {
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $id = Yii::app()->getRequest()->getPost('id');
            $proposedOrder = Yii::app()->getRequest()->getParam('pv');
            $currentOrder = Yii::app()->getRequest()->getParam('cv');
            $category_id = Yii::app()->getRequest()->getParam('category_id');
            $getProposedOrderDetail = Product::model()->findAllByAttributes(array('order_by' => $proposedOrder, 'category_id' => $category_id));
            if (!empty($getProposedOrderDetail)) {
                if ($currentOrder > $proposedOrder) {
                    $criteria = new CDbCriteria();
                    $criteria->condition = '(order_by < :order_byC AND order_by >= :order_byP) AND category_id = :category_id';
                    $criteria->params = array(':order_byC' => $currentOrder, ':order_byP' => $proposedOrder, ':category_id' => $category_id);
                    $criteria->order = 'order_by ASC';
                    $getBannerDetail = Product::model()->findAll($criteria);
                    $finalValue = $proposedOrder + 1;
                    foreach ($getBannerDetail AS $value) {
                        if ($currentOrder > $proposedOrder && $value->id != $id) {
                            Product::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                        }

                        $finalValue++;
                    }
                    Product::model()->updateByPk($id, array('order_by' => $proposedOrder, 'updated_date' => new CDbExpression('NOW()')));
                } else if ($currentOrder < $proposedOrder) {
                    $criteria = new CDbCriteria();
                    $criteria->condition = '(order_by > :order_byC AND order_by <= :order_byP) AND category_id = :category_id';
                    $criteria->params = array(':order_byC' => $currentOrder, ':order_byP' => $proposedOrder, ':category_id' => $category_id);
                    $criteria->order = 'order_by DESC';
                    $getBannerDetail = Product::model()->findAll($criteria);
                    $finalValue = $proposedOrder - 1;
                    foreach ($getBannerDetail AS $value) {
                        if ($currentOrder < $proposedOrder && $value->id != $id) {
                            Product::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                        }

                        $finalValue--;
                    }
                    Product::model()->updateByPk($id, array('order_by' => $proposedOrder, 'updated_date' => new CDbExpression('NOW()')));
                }
            } else {
                echo "false";
                die;
            }
        }
    }

    /* ----------------------------------------- Start Versioning Changes ------------------------------------- */

    public function actionVersion($id) {
        $model = new Productversion('search');
        $model->unsetAttributes();
        if (isset($_GET['Version']))
            $model->attributes = $_GET['Version'];

        $this->render('version', array(
            'model' => $model, 'id' => $id
        ));
    }

    public function actionRollback($id, $bid) {
        $modelVersion = Productversion::model()->findByPk($id);
        $modelBanner = Product::model()->findByPk($bid);
        $arr = $modelVersion->attributes;
        $arr['id'] = $modelVersion->product_id;
        $arr['order_by'] = $modelBanner->order_by;
//        echo "<pre>"; print_r($arr); die;
        Product::model()->updateByPk($bid, $arr);
        /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
        $version = new Productversion;
        $version->attributes = $modelBanner->attributes;
        $version->created_date = new CDbExpression('NOW()');
        $version->product_id = $bid;
        $version->updated_date = new CDbExpression('NOW()');
        $version->category_id = $modelBanner->category_id;
        $version->product_image = $modelBanner->product_image;
        $version->product_image_resize = $modelBanner->product_image_resize;
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

        Product::model()->updateByPk($id, array('show_status' => $showstatus));
    }

    public function loadModelVersion($id) {
        $model = Productversion::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /* ----------------------------------------- End Versioning Changes ------------------------------------- */
}
