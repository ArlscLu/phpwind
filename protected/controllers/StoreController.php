<?php

class StoreController extends ControllerChild {

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
            $arr = array('admin', 'create', 'update', 'delete', 'status', 'index', 'view', 'showstatus', 'version', 'rollback', 'deleteversion', 'viewversion');    // give all access to admin
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
        $model = new Store;
        $modelVersion = new Storeversion;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Store'])) {
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->attributes = $_POST['Store'];
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->address_eng = (!empty($_POST['address_eng']) ? $_POST['address_eng'] : '');
            $modelVersion->address_chi = (!empty($_POST['address_chi']) ? $_POST['address_chi'] : '');
            $modelVersion->show_status = 'U';
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */

            $model->attributes = $_POST['Store'];

            $model->address_eng = (!empty($_POST['address_eng']) ? $_POST['address_eng'] : '');
            $model->address_chi = (!empty($_POST['address_chi']) ? $_POST['address_chi'] : '');
            $model->created_date = new CDbExpression('NOW()');
            $model->updated_date = new CDbExpression('NOW()');
            $model->show_status = 'U';
            if ($model->insert(true)) {
                /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                $modelVersion->store_id = $model->id;
                $modelVersion->insert(true);
                /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Store has been successfully created.")));
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
        $modelVersion = new Storeversion;
        $modelVersion->attributes = $model->attributes;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Store'])) {

            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->show_status = 'U';
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */
            $model->attributes = $_POST['Store'];
            $model->address_eng = (!empty($_POST['address_eng']) ? $_POST['address_eng'] : '');
            $model->address_chi = (!empty($_POST['address_chi']) ? $_POST['address_chi'] : '');
            $model->updated_date = new CDbExpression('NOW()');
            $model->show_status = 'U';
            if ($model->update(true)) {
                /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                $modelVersion->store_id = $model->id;
                $modelVersion->insert(true);
                /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Store has been successfully updated.")));
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
    public function actionDelete($id) {
        $this->loadModel($id)->delete();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Store');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Store('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Store']))
            $model->attributes = $_GET['Store'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Store the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Store::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param Store $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'store-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    public function actionStatus($id, $status) {

        Store::model()->updateByPk($id, array('status' => $status));
    }

    /* ----------------------------------------- Start Versioning Changes ------------------------------------- */

    public function actionVersion($id) {
        $model = new Storeversion('search');
        $model->unsetAttributes();
        if (isset($_GET['Version']))
            $model->attributes = $_GET['Version'];

        $this->render('version', array(
            'model' => $model, 'id' => $id
        ));
    }

    public function actionRollback($id, $bid) {
        $modelVersion = Storeversion::model()->findByPk($id);
        $modelBanner = Store::model()->findByPk($bid);
        $arr = $modelVersion->attributes;
        $arr['id'] = $modelVersion->store_id;
        Store::model()->updateByPk($bid, $arr);
        
        /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
        $version = new Storeversion;
        $version->attributes = $modelBanner->attributes;
        $version->created_date = new CDbExpression('NOW()');
        $version->updated_date = new CDbExpression('NOW()');
        $version->store_id = $bid;
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

        Store::model()->updateByPk($id, array('show_status' => $showstatus));
    }

    public function loadModelVersion($id) {
        $model = Storeversion::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /* ----------------------------------------- End Versioning Changes ------------------------------------- */
}
