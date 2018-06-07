<?php

class BannerController extends ControllerChild {

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
        $model = new Banner;
        $modelVersion = new Version;
        $path = Yii::app()->basePath . '/../images/upload/';
        $rnd = time();

        if (isset($_POST['Banner'])) {
            $model->attributes = $_POST['Banner'];

            $getOrederNumber = $model->getLastOrderNumber();
            $model->order_by = $getOrederNumber;
            $model->created_date = new CDbExpression('NOW()');
            $model->updated_date = new CDbExpression('NOW()');
            $model->banner_alt_title_eng = $_POST['Banner']['banner_alt_title_eng'];
            $model->banner_alt_title_chi = $_POST['Banner']['banner_alt_title_chi'];
            $model->show_status = 'U';
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->attributes = $_POST['Banner'];
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->banner_alt_title_eng = $_POST['Banner']['banner_alt_title_eng'];
            $modelVersion->banner_alt_title_chi = $_POST['Banner']['banner_alt_title_chi'];
            $modelVersion->show_status = 'U';
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */

            if ((@!empty($_FILES['Banner']['name']['banner_image_eng']) && @!empty($_FILES['Banner']['name']['banner_image_chi'])) && (@!empty($_FILES['Banner']['name']['banner_mobile_image']) && @!empty($_FILES['Banner']['name']['banner_mobile_image_chi']))) {
                $imageUploadFileE = CUploadedFile::getInstance($model, 'banner_image_eng');
                $imageUploadFileC = CUploadedFile::getInstance($model, 'banner_image_chi');
                $imageMobile = CUploadedFile::getInstance($model, 'banner_mobile_image');
                $imageMobileCN = CUploadedFile::getInstance($model, 'banner_mobile_image_chi');
                $fileNameE = "{$rnd}-{$imageUploadFileE}";
                $fileNameC = "{$rnd}-{$imageUploadFileC}";
                $mobileImage = "{$rnd}-{$imageMobile}";
                $mobileImageCN = "{$rnd}-{$imageMobileCN}";
                $model->banner_image_eng = $fileNameE;
                $model->banner_image_chi = $fileNameC;
                $model->banner_mobile_image = $mobileImage;
                $model->banner_mobile_image_chi = $mobileImageCN;

                /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                $modelVersion->banner_image_eng = $fileNameE;
                $modelVersion->banner_image_chi = $fileNameC;
                $modelVersion->banner_mobile_image = $mobileImage;
                $modelVersion->banner_mobile_image_chi = $mobileImageCN;
                /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                if ($model->insert(true)) {
                    $imageUploadFileE->saveAs($path . $fileNameE);
                    $imageUploadFileC->saveAs($path . $fileNameC);
                    $imageMobile->saveAs($path . $mobileImage);
                    $imageMobileCN->saveAs($path . $mobileImageCN);
                    /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                    $modelVersion->banner_id = $model->id;
                    $modelVersion->insert(true);
                    /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                    Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Banner has been successfully created.")));
                    exit();
                }
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
        $modelVersion = new Version;
        $modelVersion->attributes = $model->attributes;
        $path = Yii::app()->basePath . '/../images/upload/';
        $rnd = time();

        if (isset($_POST['Banner'])) {

            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->banner_alt_title_eng = $model->banner_alt_title_eng;
            $modelVersion->banner_alt_title_chi = $model->banner_alt_title_chi;
            $modelVersion->banner_image_eng = $model->banner_image_eng;
            $modelVersion->banner_image_chi = $model->banner_image_chi;
            $modelVersion->banner_mobile_image = $model->banner_mobile_image;
            $modelVersion->banner_mobile_image_chi = $model->banner_mobile_image_chi;
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->show_status = 'U';
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */

            $model->attributes = $_POST['Banner'];
            $model->updated_date = new CDbExpression('NOW()');
            $model->banner_alt_title_eng = $_POST['Banner']['banner_alt_title_eng'];
            $model->banner_alt_title_chi = $_POST['Banner']['banner_alt_title_chi'];
            $model->show_status = 'U';



            if (@!empty($_FILES['Banner']['name']['banner_image_eng'])) {
                $imageUploadFileE = CUploadedFile::getInstance($model, 'banner_image_eng');
                $fileNameE = "{$rnd}-{$imageUploadFileE}";
                $model->banner_image_eng = $fileNameE;
                $imageUploadFileE->saveAs($path . $fileNameE);
            }
            if (@!empty($_FILES['Banner']['name']['banner_image_chi'])) {
                $imageUploadFileC = CUploadedFile::getInstance($model, 'banner_image_chi');
                $fileNameC = "{$rnd}-{$imageUploadFileC}";
                $model->banner_image_chi = $fileNameC;
                $imageUploadFileC->saveAs($path . $fileNameC);
            }
            if (@!empty($_FILES['Banner']['name']['banner_mobile_image'])) {
                $banner_mobile_image = CUploadedFile::getInstance($model, 'banner_mobile_image');
                $mobileImage = "{$rnd}-{$banner_mobile_image}";
                $model->banner_mobile_image = $mobileImage;
                $banner_mobile_image->saveAs($path . $mobileImage);
            }
            if (@!empty($_FILES['Banner']['name']['banner_mobile_image_chi'])) {
                $banner_mobile_imageCN = CUploadedFile::getInstance($model, 'banner_mobile_image_chi');
                $mobileImageCN = "{$rnd}-{$banner_mobile_imageCN}";
                $model->banner_mobile_image_chi = $mobileImageCN;
                $banner_mobile_imageCN->saveAs($path . $mobileImageCN);
            }
            if ($model->update(true)) {
                $modelVersion->banner_id = $model->id;
                $modelVersion->insert(true);
                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Banner has been successfully updated.")));
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
        if ($order > 0) {
            $criteria = new CDbCriteria();
            $criteria->condition = 'order_by > :order_byC';
            $criteria->params = array(':order_byC' => $order);
            $criteria->order = 'order_by ASC';
            $getBannerDetail = Banner::model()->findAll($criteria);
            $finalValue = $order;
            foreach ($getBannerDetail AS $value) {
                if ($value->id != $id) {
                    Banner::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                }

                $finalValue++;
            }
        }
        try {
            $sBannerImage = Banner::model()->findByAttributes(array('id' => $id));
            @unlink(ROOTPATH . '/images/upload/' . $sBannerImage->banner_image_eng);
            @unlink(ROOTPATH . '/images/upload/' . $sBannerImage->banner_image_chi);
            @unlink(ROOTPATH . '/images/upload/' . $sBannerImage->banner_mobile_image);
            @unlink(ROOTPATH . '/images/upload/' . $sBannerImage->banner_mobile_image_chi);
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
        $dataProvider = new CActiveDataProvider('Banner');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Banner('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Banner']))
            $model->attributes = $_GET['Banner'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Banner the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Banner::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    public function loadModelVersion($id) {
        $model = Version::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param Banner $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'banner-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    public function actionStatus($id, $status) {

        Banner::model()->updateByPk($id, array('status' => $status));
    }

    public function actionShowstatus($id, $showstatus) {

        Banner::model()->updateByPk($id, array('show_status' => $showstatus));
    }

    public function actionSaveordervalue() {
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $id = Yii::app()->getRequest()->getPost('id');
            $value = Yii::app()->getRequest()->getParam('value');
        }
    }

    public function actionUpdategridorder() {
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $id = Yii::app()->getRequest()->getPost('id');
            $proposedOrder = Yii::app()->getRequest()->getParam('pv');
            $currentOrder = Yii::app()->getRequest()->getParam('cv');
            $getProposedOrderDetail = Banner::model()->findAllByAttributes(array('order_by' => $proposedOrder));
            if (!empty($getProposedOrderDetail)) {
                if ($currentOrder > $proposedOrder) {
                    $criteria = new CDbCriteria();
                    $criteria->condition = 'order_by < :order_byC AND order_by >= :order_byP';
                    $criteria->params = array(':order_byC' => $currentOrder, ':order_byP' => $proposedOrder);
                    $criteria->order = 'order_by ASC';
                    $getBannerDetail = Banner::model()->findAll($criteria);
                    $finalValue = $proposedOrder + 1;
                    foreach ($getBannerDetail AS $value) {
                        if ($currentOrder > $proposedOrder && $value->id != $id) {
                            Banner::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                        }

                        $finalValue++;
                    }
                    Banner::model()->updateByPk($id, array('order_by' => $proposedOrder, 'updated_date' => new CDbExpression('NOW()')));
                } else if ($currentOrder < $proposedOrder) {
                    $criteria = new CDbCriteria();
                    $criteria->condition = 'order_by > :order_byC AND order_by <= :order_byP';
                    $criteria->params = array(':order_byC' => $currentOrder, ':order_byP' => $proposedOrder);
                    $criteria->order = 'order_by DESC';
                    $getBannerDetail = Banner::model()->findAll($criteria);
                    $finalValue = $proposedOrder - 1;
                    foreach ($getBannerDetail AS $value) {
                        if ($currentOrder < $proposedOrder && $value->id != $id) {
                            Banner::model()->updateByPk($value->id, array('order_by' => $finalValue, 'updated_date' => new CDbExpression('NOW()')));
                        }

                        $finalValue--;
                    }
                    Banner::model()->updateByPk($id, array('order_by' => $proposedOrder, 'updated_date' => new CDbExpression('NOW()')));
                }
            } else {
                echo "false";
                die;
            }
        }
    }

    /* ----------------------------------------- Start Versioning Changes ------------------------------------- */

    public function actionVersion($id) {
        $model = new Version('search');
        $model->unsetAttributes();
        if (isset($_GET['Version']))
            $model->attributes = $_GET['Version'];

        $this->render('version', array(
            'model' => $model, 'id' => $id
        ));
    }

    public function actionRollback($id, $bid) {
        
        $modelVersion = Version::model()->findByPk($id);
        $modelBanner = Banner::model()->findByPk($bid);
        $arr = $modelVersion->attributes;
        $arr['id'] = $modelVersion->banner_id;
        $arr['order_by'] = $modelBanner->order_by;
        Banner::model()->updateByPk($bid, $arr);

        /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
        $version = new Version;
        $version->attributes = $modelBanner->attributes;
        $version->created_date = new CDbExpression('NOW()');
        $version->banner_id = $bid;
        $version->updated_date = new CDbExpression('NOW()');
        $version->banner_alt_title_eng = $modelBanner->banner_alt_title_eng;
        $version->banner_alt_title_chi = $modelBanner->banner_alt_title_chi;
        $version->banner_image_eng = $modelBanner->banner_image_eng;
        $version->banner_image_chi = $modelBanner->banner_image_chi;
        $version->banner_mobile_image = $modelBanner->banner_mobile_image;
        $version->banner_mobile_image_chi = $modelBanner->banner_mobile_image_chi;
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

    /* ----------------------------------------- End Versioning Changes ------------------------------------- */
}
