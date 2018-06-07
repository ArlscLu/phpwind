<?php

class ContactController extends Controller {

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
            $arr = array('admin', 'create', 'update', 'delete', 'status', 'index', 'view', 'download');    // give all access to admin
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
        $model = new Contact;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Contact'])) {
            $model->attributes = $_POST['Contact'];
            if ($model->save())
                $this->redirect(array('view', 'id' => $model->id));
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

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Contact'])) {
            $model->attributes = $_POST['Contact'];
            if ($model->save())
                $this->redirect(array('view', 'id' => $model->id));
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
        $dataProvider = new CActiveDataProvider('Contact');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Contact('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Contact']))
            $model->attributes = $_GET['Contact'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Contact the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Contact::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param Contact $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'contact-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    public function actionStatus($id, $status) {

        Contact::model()->updateByPk($id, array('status' => $status));
    }

   /*  function actionDownload($name, $mobile, $type) { 
        $model = new Contact();		
         header("Content-Disposition: attachment;Filename=Contact-Us_" . date('d-m-Y') . ".csv");
        header("Content-Encoding: UTF-8");
         header("Content-Type: application/vnd.ms-excel; charset = gb2312");
        $sep = "\t";        //tabbed character
 $schema_insert_rows = "";

        $schema_insert_rows.="S. No." . $sep;
        $schema_insert_rows.="Name" . $sep;
        $schema_insert_rows.="Email" . $sep;
        $schema_insert_rows.="Mobile" . $sep;
        $schema_insert_rows.="Message" . $sep;
        $schema_insert_rows.="Type" . $sep;
        $schema_insert_rows.="Status" . $sep;
        $schema_insert_rows.="Created_date" . $sep;


        $schema_insert_rows.="\n";
        $nameP = (!empty($name) ? $name : '');
        $mobileP = (!empty($mobile) ? $mobile : '');
        $typeP = (!empty($type) ? $type : '');
        $contact_us = $model->getContactList(array('nameP' => $nameP, 'mobileP' => $mobileP, 'typeP' => $typeP)); 
        
        $i = 1;
        foreach ($contact_us AS $key => $value) {
            if ($value['status'] == 1) {
                $status = "Active";
            } else {
                $status = "Deactive";
            }
            if ($value['type'] == 'CHI') {
                $message = trim($value['message']) . $sep;
                $type = 'Chinese';
            } else {
                $message = str_replace(',', ' ', trim(preg_replace("/[^A-Za-z0-9\:, ]/", ' ', $value['message']))) . $sep;
                $type = 'English';
            }

            $schema_insert_rows.= $i++ . $sep;
            $schema_insert_rows.= $value['name'] . $sep;
            $schema_insert_rows.= $value['email'] . $sep;
            $schema_insert_rows.= $value['mobile'] . $sep;
            $schema_insert_rows.= $message ;
            $schema_insert_rows.= $type . $sep;
            $schema_insert_rows.= $status . $sep;
            $schema_insert_rows.= $value['created_date'] . $sep;
            $schema_insert_rows.="\n";
        }
         echo "\xEF\xBB\xBF".$schema_insert_rows;
    }
 */
 
 
   function actionDownload($name, $mobile, $type) {
       $outstr = NULL;
       $model = new Contact();
       
       
      header("Content-Disposition: attachment;Filename=Contact-Us_" . date('d-m-Y') . ".csv");
header("Content-Encoding: UTF-8");
header("Content-Type: application/csv ; charset = GB2312");
       $haederArray = array("S.No.", "Name", "Email", "Mobile", 'Message', "Type", "Status", "Created_date");
        foreach ($haederArray AS $row) {
           $outstr.= $row . ',';
       }
       $outstr = substr($outstr, 0, -1) . "\n";
       $nameP = (!empty($name) ? $name : '');
       $mobileP = (!empty($mobile) ? $mobile : '');
       $typeP = (!empty($type) ? $type : '');
       $contact_us = $model->getContactList(array('nameP'=>$nameP,'mobileP'=>$mobileP,'typeP'=>$typeP));
       $i = 1;
       foreach ($contact_us AS $key => $value) {
           if ($value['status'] == 1) {
               $status = "Active";
           } else {
               $status = "Deactive";
           }
           if($value['type']=='CHI')
           {
               $message =trim($value['message']) . ',';
               $type='Chinese';
           }
           else {
               $message = str_replace(',', ' ', trim(preg_replace("/[^A-Za-z0-9\:, ]/", ' ', $value['message']))) . ',';
               $type ='English';
           }
           $outstr.= $i . ',';
           $outstr.= trim($value['name']) . ',';
           $outstr.= trim($value['email']) . ',';
           $outstr.= trim($value['mobile']) . ',';
           $outstr.= $message;
           $outstr.= trim($type) . ',';
           $outstr.= trim($status) . ',';
           $outstr.= trim($value['created_date']) . ',';
           $outstr .= "\n";
           $i++;
       }
       echo "\xEF\xBB\xBF".$outstr;
   }
}
