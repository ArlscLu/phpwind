<?php

/**
 * Description of RoleManager
 *
 * @author jiriso
 */
class AppHelper {
    /*
     * checkRole
     */

    static function checkRole($strRole) {
        if (isset(Yii::app()->user->adminRoles) && array_key_exists($strRole, Yii::app()->user->adminRoles)) {
            return Yii::app()->user->adminRoles[$strRole];
        } else {
            return false;
        }
    }

    /*
     * Author: Vineet
     * Purpose: To parse the request URL and return the access permission
     * Param: Request URL r="XYZ"
     * Return: true/false as string
     */

    static function checkAccessRBAC($strRequest) {
        $arrRequest = explode("/", $strRequest);
        if (isset($arrRequest)) {
            $arrCount = count($arrRequest);
            if ($arrCount > 0) {
                $str = '';
                for ($i = $arrCount - 1; $i >= 0; $i--) {
                    $str .= ucfirst($arrRequest[$i]);
                }
            }
        }
        $objRBAC = new RBACAccessVerifier();
        return "'" . $objRBAC->checkAccess($str) . "'";
    }

    /*
     * Render the Menu
     */

    static function Menu() {

        $arrMenu = array
            (
            array('label' => 'Home', 'url' => array("route" => '/dashboard/index'), 'visible' => (Yii::app()->user->checkAccess('Superadmin')), 'active' => AppHelper::MenuActive('home')),
            array('label' => 'Dashboard', 'url' => array("route" => '/dashboard/index'), 'visible' => (Yii::app()->user->checkAccess('LocationReader')), 'active' => AppHelper::MenuActive('dashboard')),
            array('label' => 'Preferences', 'url' => array(''), 'active' => AppHelper::MenuActive('Preferences'), 'visible' => (Yii::app()->user->checkAccess('BusinessOwner')),
                array('label' => 'User', 'url' => array("route" => '/user/admin'), 'visible' => (Yii::app()->user->checkAccess('Superadmin') || Yii::app()->user->checkAccess('BusinessOwner') ), 'active' => AppHelper::MenuActive('user')),
                array('label' => 'Manage Roles', 'url' => array("route" => '/acl/authItem/manageRoles'), 'visible' => (Yii::app()->user->checkAccess('Superadmin') || Yii::app()->user->checkAccess('BusinessOwner')), 'active' => AppHelper::MenuActive('authItem')),
                array('label' => 'Tag', 'url' => array("route" => '/tag/admin'), 'visible' => Yii::app()->user->checkAccess('BusinessOwner'), 'active' => AppHelper::MenuActive('tag')),
                array('label' => 'Location', 'url' => array("route" => '/location/admin'), 'visible' => (Yii::app()->user->checkAccess('LocationWriter') ), 'active' => AppHelper::MenuActive('location')),
                array('label' => 'Location Group', 'url' => array("route" => '/locationGroup/admin'), 'visible' => (Yii::app()->user->checkAccess('BusinessOwner') ), 'active' => AppHelper::MenuActive('locationGroup')),
            ),
            array('label' => 'Business', 'url' => array("route" => '/business/admin'), 'visible' => (Yii::app()->user->checkAccess('Superadmin')), 'active' => AppHelper::MenuActive('business')),
            array('label' => 'User', 'url' => array("route" => '/user/admin'), 'visible' => (Yii::app()->user->checkAccess('Superadmin') ), 'active' => AppHelper::MenuActive('user')),
            array('label' => 'Suspense', 'url' => array("route" => '/dashboard/suspenseMessage'), 'visible' => (Yii::app()->user->checkAccess('Superadmin')), 'active' => AppHelper::MenuActive('suspenseMessage')),
            array('label' => 'Coupons', 'url' => array("route" => '/coupon/admin'), 'visible' => (Yii::app()->user->checkAccess('LocationOwner') ), 'active' => AppHelper::MenuActive('coupon')),
//            array('label' => 'Coupons', 'url' => array("route" =>'/coupon/admin'), 'visible' => (Yii::app()->user->checkAccess('LocationOwner') ), 'active' => true),
        );
        return $arrMenu;
    }


//    static function Menu() {
//
//        $arrMenu = array
//            (
//            array('label' => 'Home', 'url' => array('/dashboard/index'), 'visible' => (Yii::app()->user->checkAccess('Superadmin')), 'active' => AppHelper::MenuActive('home')),
//            array('label' => 'Dashboard', 'url' => array('/dashboard/index'), 'visible' => (Yii::app()->user->checkAccess('LocationReader')), 'active' => AppHelper::MenuActive('dashboard')),
//            array('label' => 'Preferences', 'url' => '#','visible'=>(Yii::app()->user->checkAccess('BusinessOwner')), 'active' => AppHelper::MenuActive('Preferences'),
//                'items' => array(
//                    array('label' => 'User', 'url' => array('/user/admin'), 'visible' => (Yii::app()->user->checkAccess('Superadmin') || Yii::app()->user->checkAccess('BusinessOwner') ), 'active' => AppHelper::MenuActive('user')),
//                    array('label' => 'Manage Roles', 'url' => array('/acl/authItem/manageRoles'), 'visible' => (Yii::app()->user->checkAccess('Superadmin') || Yii::app()->user->checkAccess('BusinessOwner')), 'active' => AppHelper::MenuActive('authItem')),
//                    array('label' => 'Tag', 'url' => array('/tag/admin'),'visible' => Yii::app()->user->checkAccess('BusinessOwner'), 'active' => AppHelper::MenuActive('tag')),
//                    array('label' => 'Location', 'url' => array('/location/admin'), 'visible' => (Yii::app()->user->checkAccess('LocationWriter') ), 'active' => AppHelper::MenuActive('location')),
//                    array('label' => 'Location Group', 'url' => array('/locationGroup/admin'), 'visible' => (Yii::app()->user->checkAccess('BusinessOwner') ), 'active' => AppHelper::MenuActive('locationGroup')),
//                ),
//            ),
//            array('label' => 'Business', 'url' => array('/business/admin'), 'visible' => (Yii::app()->user->checkAccess('Superadmin')), 'active' => AppHelper::MenuActive('business')),
//            array('label' => 'Suspense', 'url' => array('/dashboard/suspenseMessage'), 'visible' => (Yii::app()->user->checkAccess('Superadmin')), 'active' => AppHelper::MenuActive('suspenseMessage')),
//            array('label' => 'Coupons', 'url' => array('/coupon/admin'), 'visible' => (Yii::app()->user->checkAccess('LocationOwner') ), 'active' => AppHelper::MenuActive('coupon')),
//        );
//        return $arrMenu;
//    }

    static function MenuActive($menu) {
        switch ($menu) {

            case "dashboard":
                if (Yii::app()->controller->id == "dashboard" && (Yii::app()->controller->action->id == "index" || Yii::app()->controller->action->id == "message")) {
                    return true;
                }
                break;
            case "business":
                if (isset($_REQUEST['bId']) || Yii::app()->controller->id == "business") {
                    return true;
                }
                break;
            case "user":
                if ((Yii::app()->controller->id == "user" && !isset($_REQUEST['bId']) || (Yii::app()->user->checkAccess('BusinessOwner') && Yii::app()->controller->action->id == 'addUserLocation')) && (Yii::app()->controller->action->id != 'newRole' && Yii::app()->controller->action->id != 'assign')) {
                    return true;
                }
                break;
            case "suspenseMessage":
                if (Yii::app()->controller->id == "dashboard" && Yii::app()->controller->action->id == "suspenseMessage") {
                    return true;
                }
                break;
            case "home":
                if (Yii::app()->controller->id == "dashboard" && Yii::app()->controller->action->id == "index" && !isset($_REQUEST['bId'])) {
                    return true;
                }
                break;
            case "authItem":
                if (Yii::app()->controller->id == "authItem" || Yii::app()->controller->action->id == 'newRole' || Yii::app()->controller->action->id == 'assign') {
                    return true;
                }
                break;
            case "Preferences":
                if (Yii::app()->controller->id == "user" || Yii::app()->controller->id == "tag" || Yii::app()->controller->id == "authItem" || Yii::app()->controller->id == "location" || Yii::app()->controller->id == "locationGroup") {
                    return true;
                }
                break;
            default:
                if (Yii::app()->controller->id == $menu)
                    return true;
                break;
        }

        return false;
    }

//array('label'=>'Blog', 'url'=>('http://www.my-page.com')), 
    /*
     * newUID
     */

    static function newUID() {
        return strtoupper(md5(uniqid('', true)));
    }

    /**
     * Return Yes or No value
     * @param <type> $val
     */
    static function YesNoFormat($val) {
        return $val == true ? 'Yes' : 'No';
    }

    /*
     * Author: Vineet
     * param: date with yyyy-mm-dd hh:mm:ss format
     * Purpose: change the date format of the parameter
     * WO#01
     * Date: 05-30-2012
     * return: any format which will be passed in $type variable - but should be defined by PHP date() function. Please refer http://php.net/date
     */

    static function applicationDateFormat($cDate, $type = '') {
        if (isset($cDate) && !empty($cDate)) {
            $arrDateTime = explode(" ", $cDate);
            $Date = '';
            $Time = '';
            $yyyy = '';
            $mm = '';
            $dd = '';
            $hh = 0;
            $ii = 0;
            $ss = 0; //declaring variable
            //setting date array
            if (isset($arrDateTime[0])) {
                $Date = $arrDateTime[0];
                $arrDate = explode('-', $Date);

                $yyyy = $arrDate[0];
                $mm = $arrDate[1];
                $dd = $arrDate[2];
            }

            //setting time array
            if (isset($arrDateTime[1])) {
                $Time = $arrDateTime[1];
                $arrTime = explode(':', $Time);

                @$hh = $arrTime[0];
                @$ii = $arrTime[1];
                @$ss = $arrTime[2];
            }

            if (isset($type)) {
                return date($type, mktime($hh, $ii, $ss, $mm, $dd, $yyyy));
            } else {
                return date('m-d-Y H:i:s', mktime($hh, $ii, $ss, $mm, $dd, $yyyy));
            }
        } else {
            return $cDate;
        }
    }

    /*
     * Author: Vineet
     * param: date with mm-dd-yyyy format
     * Purpose: change the date format of the parameter
     * WO#01
     * Date: 05-30-2012
     * return: any format which will be passed in $type variable - but should be defined by PHP date() function. Please refer http://php.net/date
     */

    static function applicationDateFormatForDB($cDate, $type = '') {
        if (isset($cDate) && !empty($cDate)) {
            $Date = '';
            $yyyy = '';
            $mm = '';
            $dd = ''; //declaring variable
            //setting date array
            $arrDate = explode('-', $cDate);

            $mm = $arrDate[0];
            $dd = $arrDate[1];
            $yyyy = $arrDate[2];

            if (isset($type)) {
                return date($type, mktime(0, 0, 0, $mm, $dd, $yyyy));
            } else {
                return date('Y-m-d H:i:s', mktime(0, 0, 0, $mm, $dd, $yyyy));
            }
        } else {
            return $cDate;
        }
    }

    /*
     * Author: vineet
     * Desc: return the value for date to display
     */

    static function DateType($dateType) {
        switch ($dateType) {
            case "d": return "Day(s)";
                break;
            case "m": return "Month(s)";
                break;
            case "y":case "yyyy": return "Year(s)"; //vineet - bug 1049 - change save value for DatePart
                break;
            case "w":case "ww": return "Week(s)"; //vineet - bug 1049 - change save value for DatePart
                break;
        }
    }

    /*
     * Author: Varun
     * Create path
     */

    static function createURL($data) {
        $url = 'https://';
        $url .= $_SERVER['SERVER_NAME'];
//        if (isset($_SERVER['SERVER_PORT'])) {
//            $url .= ':' . $_SERVER['SERVER_PORT'];
//        }
        $url .= '/register/?regcode=' . $data;

        $finalURL = '<a href="' . $url . '" target="_blank">' . $url . '</a>';
        return $finalURL;
    }

    //Funtion created to check cookie at time of login
    static function checkLangCookie() {
        $cookie = (isset(Yii::app()->request->cookies['lang_flag'])) ? Yii::app()->request->cookies['lang_flag']->value : 'en';
        $app = Yii::app()->setLanguage($cookie);
    }

    // Function created to set Cookie for language clicked.
    static function setLangCookie($lang) {
        Yii::app()->request->cookies['lang_flag'] = new CHttpCookie('lang_flag', $lang);
    }

    //Function to get Parent Object from Group table

    static function customYesNoFormat($val) {
        $yn = '';
        if ($val > 0) {
            $yn = Yii::t('app', 'Yes');
        } else {
            $yn = Yii::t('app', 'No');
        }
        return $yn;
    }

    /*
     * @Author: Vineet
     * @param: userid and GroupUID
     * @description: fetch scret key from Attribute table by paramenetrs
     */

    static function getSecretKey($gid, $title) {
        return GroupAttributes::model()->checkValue($gid, $title);
    }

    /*
     * @Author: Vineet
     * @param: $dataPacket, $password, $nBits
     * @param dataPacket source text to be encrypted
     * @param password  the password to use to generate a key
     * @param nBits     number of bits to be used in the key (128, 192, or 256)
     * @return          encrypted text
     * @description: Include AES library and encrypt by passing parameters
     */

    static function getEncryptedKey($dataPacket, $password, $nBits) {
        return AesCtr::encrypt($dataPacket, $password, $nBits);
    }

    static function printPDF($template) {
        ini_set("memory_limit", "512M");

        $mPDF1 = Yii::app()->ePdf->mpdf();

        # You can easily override default constructor's params
        $mPDF1 = Yii::app()->ePdf->mpdf('', 'A5');

        # render (full page)
//        $mPDF1->WriteHTML($this->render('index', array(), true));
        # Load a stylesheet
        $stylesheet = file_get_contents(Yii::getPathOfAlias('webroot.css') . '/main.css');
        $mPDF1->WriteHTML($stylesheet, 1);

        # renderPartial (only 'view' of current controller)
        $mPDF1->WriteHTML($template);

        # Outputs ready PDF
        $mPDF1->Output('Company.pdf', 'D');
    }

    static function getGroupsList($selectedGroupUID = '', $name = '', $id = '') {
        $companies = Group::model()->findAll(array('condition' => 'ParentGroupUID is NULL or ParentGroupUID = \'\'', 'order' => 'GroupName asc'));
        $str = "<select style='width:450px;' id='" . $id . "' name='" . $name . "'><option value=''> -- Choose Company -- </option>";
        foreach ($companies as $company) {
            $selected = '';

            if (isset($selectedGroupUID) && $company->GroupUID == $selectedGroupUID) {
                $selected = 'selected ="selected" ';
            }
            $str .= "<option $selected value='$company->GroupUID'>";
            $str .= $company->GroupName;
            $str .= "</option>";

            $subCompanys = Group::model()->findAll(array('condition' => "ParentGroupUID = '$company->GroupUID'", 'order' => 'GroupName asc'));

            if (count($subCompanys)) {
                foreach ($subCompanys as $sub) {
                    $subselected = '';
                    if (isset($selectedGroupUID) && $sub->GroupUID == $selectedGroupUID) {
                        $subselected = 'selected ="selected" ';
                    }
                    $str .= "<option $subselected value='$sub->GroupUID'>";
                    $str .= $company->GroupName . ' &raquo; ' . $sub->GroupName;
                    $str .= "</option>";
                }
            }
        }
        $str .= "</select>";
        return $str;
    }

    static function validName($strName) {
        $pos = strpos($strName, ",");
        if ($pos === false) {
            return true;
        } else {
            return false;
        }
        return true;
    }

    static function urlExists($url) {
        @$header = get_headers($url);
        $status = array();
        preg_match('/HTTP\/.* ([0-9]+) .*/', $header[0], $status);

        if (isset($status[1])) {
            return ($status[1] == 200);
        } else {
            return false;
        }
    }

    static function readQuickLaunchFolder($path) {
        $arrTemp = array();
        if (is_dir($path)) {
            if ($handle = opendir($path)) {
                $i = 0;
                while (false !== ($entry = readdir($handle))) {
                    if (!($entry == '.' || $entry == '..' || $entry == '.svn')) {
                        $arrTemp[$i] = $entry;
                        $i++;
                    }
                }
                closedir($handle);
                return $arrTemp;
            }
        } else {
            return $arrTemp;
        }
    }

    static function mailInstance() {
        $mail = new JPhpMailer;
        $mail->IsSMTP();
        $mail->SMTPSecure = "ssl";
        $mail->Host = Yii::app()->params['mail']['Host'];
        $mail->SMTPAuth = false;
        $mail->SMTPSecure = false;
        $mail->Username = Yii::app()->params['mail']['Username'];
        $mail->Port = '25';
        $mail->Password = Yii::app()->params['mail']['Password'];
        $mail->SMTPKeepAlive = true;
        $mail->Mailer = "smtp";
        $mail->CharSet = 'utf-8';
        $mail->SMTPDebug = 0;
        $mail->SetFrom(Yii::app()->params['mail']['From'], Yii::app()->params['mail']['FromName']); // Email add
        return $mail;
    }

    /* viveks@29-04-2013
     * Send mail when called as per need
     */

    public function sendMail($mail_arr) {

        Yii::import('application.extensions.phpmailer.JPhpMailer');
        $mail = AppHelper::mailInstance();
        $mail->Subject = $mail_arr['subject'];
        $mail->MsgHTML($mail_arr['message'] . '<br><br><br> Regards,<br>' . Yii::app()->params['sitename'] . '<br><br><hr>&nbsp;</hr><small>It is system generated mail, Please do not reply</small>');
        $mail->AddAddress($mail_arr['to'], '');
        $mail->Send();
    }

    static function downloadFile($fileNamePath) {
        if (file_exists($fileNamePath)) {
            header("Content-type: application/excel;");
            header("Pragma :no-cache"); // Vineet Bug ID = 1060
            header('Content-Disposition: attachment; filename=' . basename($fileNamePath));
            ob_clean();
            flush();
            readfile($fileNamePath);
            die;
        } else {
            die("file Not Found");
        }
    }

    /*
     * Validate Email address.
     */

    static function check_email_address($email) {
        // First, we check that there's one @ symbol, and that the lengths are right
        if (!preg_match("/^[^@]{1,64}@[^@]{1,255}$/", $email)) {
            // Email invalid because wrong number of characters in one section, or wrong number of @ symbols.
            return false;
        }
        // Split it into sections to make life easier
        $email_array = explode("@", $email);
        $local_array = explode(".", $email_array[0]);
        for ($i = 0; $i < sizeof($local_array); $i++) {
            if (!preg_match("/^(([A-Za-z0-9!#$%&'*+\/=?^_`{|}~-][A-Za-z0-9!#$%&'*+\/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$/", $local_array[$i])) {
                return false;
            }
        }
        if (!preg_match("/^\[?[0-9\.]+\]?$/", $email_array[1])) { // Check if domain is IP. If not, it should be valid domain name
            $domain_array = explode(".", $email_array[1]);
            if (sizeof($domain_array) < 2) {
                return false; // Not enough parts to domain
            }
            for ($i = 0; $i < sizeof($domain_array); $i++) {
                if (!preg_match("/^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|([A-Za-z0-9]+))$/", $domain_array[$i])) {
                    return false;
                }
            }
        }

        return true;
    }

    /*
     *  strtolower
     */

    static function SSO2NeoManager() {
        if (isset(Yii::app()->user->adminAuth)) {
            $email = strtolower(Yii::app()->user->adminAuth['EMAIL']);
            $host = strtolower($_SERVER['SERVER_NAME']);
            $date = strtolower(gmdate("Ymd"));
            $url = 'email=' . $email;
            $url .= '&host=' . $host;
            $url .= '&date=' . $date;
            $key = '' . sha1($email . $host . $date . '999');
            $url .= '&key=' . $key;
            return CHtml::normalizeUrl('https://' . $_SERVER['SERVER_NAME'] . '/neomanager/login.cfm?' . $url);
        }
    }

    /*
     * @author: Vineet
     * @purpose: get character value from below array
     */
    /*
     * @author: Vineet
     * @changed at: 19-2-2013
     * @Bug Id - 254
     * @Description - Change static function in accordance to make compatible with MSSQL data format.
     */

    static function getCharacter($string) {
        $arrayChars = array(
            'á' => '&aacute;',
            'à' => '&agrave;',
            'â' => '&acirc;',
            'å' => '&aring;',
            'ã' => '&atilde;',
            'ä' => '&auml;',
            'æ' => '&aelig;',
            'ç' => '&ccedil;',
            'é' => '&eacute;',
            'è' => '&egrave;',
            'ê' => '&ecirc;',
            'ë' => '&euml;',
            'í' => '&iacute;',
            'ì' => '&igrave;',
            'î' => '&icirc;',
            'ï' => '&iuml;',
            'ñ' => '&ntilde;',
            'ó' => '&oacute;',
            'ò' => '&ograve;',
            'ô' => '&ocirc;',
            'ø' => '&oslash;',
            'õ' => '&otilde;',
            'ö' => '&ouml;',
            'ß' => '&szlig;',
            'ú' => '&uacute;',
            'ù' => '&ugrave;',
            'û' => '&ucirc;',
            'ü' => '&uuml;',
            'ÿ' => '&yuml;',
            'Á' => '&Aacute;',
            'À' => '&Agrave;',
            'Â' => '&Acirc;',
            'Å' => '&Aring;',
            'Ã' => '&Atilde;',
            'Ä' => '&Auml;',
            'Æ' => '&AElig;',
            'Ç' => '&Ccedil;',
            'É' => '&Eacute;',
            'È' => '&Egrave;',
            'Ê' => '&Ecirc;',
            'Ë' => '&Euml;',
            'Í' => '&Iacute;',
            'Ì' => '&Igrave;',
            'Î' => '&Icirc;',
            'Ï' => '&Iuml;',
            'Ñ' => '&Ntilde;',
            'Ó' => '&Oacute;',
            'Ò' => '&Ograve;',
            'Ô' => '&Ocirc;',
            'Ø' => '&Oslash;',
            'Õ' => '&Otilde;',
            'Ö' => '&Ouml;',
            'Ú' => '&Uacute;',
            'Ù' => '&Ugrave;',
            'Û' => '&Ucirc;',
            'Ü' => '&Uuml;',
            '&' => '&amp;'
        );


        $arrayChars = array_flip($arrayChars);
        return str_replace(array_keys($arrayChars), array_values($arrayChars), $string);
    }

    static function getGroupName($data) {
        if (isset($data->tblLocationGroups) && count($data->tblLocationGroups) > 0) {
            $groups = array();
            foreach ($data->tblLocationGroups as $g) {
                $groups[] = $g->group_name;
            }
            return '<ul><li>' . implode('</li><li>', $groups) . '</li></ul>';
        } else {
            return false;
            ;
        }
    }

    static function getLocationName($data) {

        if (isset($data->userLocation) && count($data->userLocation) > 0) {
            $location = array();
            foreach ($data->userLocation as $g) {
                if ($g->location_group_id != null) {
                    $location[] = $g->location->location_name . " (" . $g->locationGroup->group_name . ")";
                } else {
                    $location[] = $g->location->location_name;
                }
            }
            return '<ul><li>' . implode('</li><li>', $location) . '</li></ul>';
        } else {
            return false;
            ;
        }
    }

    static function getCouponLocation($data) {

        if (isset($data->tblCouponGroups) && count($data->tblCouponGroups) > 0) {
            $location = array();
            foreach ($data->tblCouponGroups as $g) {
                if ($g->location_group_id != null) {
                    $location[] = $g->location->location_name . " (" . $g->locationGroup->group_name . ")";
                } else {
                    $location[] = $g->location->location_name;
                }
            }
            return '<ul><li>' . implode('</li><li>', $location) . '</li></ul>';
        } else {
            return false;
            ;
        }
    }

    static function parseSentiments($string) {
        $objSentiment = Sentiments::init('alchemy');
        $objSentiment->initiate($string);
        return $data = $objSentiment->parseText();
    }

    static function getBusinessID($bId = '') {
        $businessId = '';
        if (Yii::app()->user->checkAccess('Superadmin')) {
            if ($bId != '') {
                $businessId = $bId;
            } else {
                $objBusinessId = TblBusiness::model()->findByAttributes(array('userid' => Yii::app()->user->adminAuth['USERUID']));
                if (count($objBusinessId) > 0) {
                    $businessId = $objBusinessId->business_id;
                }
            }
        } else {
            $objBusinessId = TblBusiness::model()->findByAttributes(array('userid' => Yii::app()->user->adminAuth['USERUID']));
            if (count($objBusinessId) > 0) {
                $businessId = $objBusinessId->business_id;
            } else {
                $objLocation = TblUserLocation::model()->find('userid=:userid', array(':userid' => Yii::app()->user->adminAuth['USERUID']));
                if (count($objLocation) > 0) {
                    $businessId = $objLocation->location->business_id;
                }
            }
        }
        return $businessId;
    }

    static function SendSMS($msg, $mobileNumber) {
        if (Yii::app()->params->SMSGateway['enable']) {
            $objSMSGateway = SMSGateway::init('mCarbon');
            $objSMSGateway->sendMessage($msg, $mobileNumber);
        }
        return true;
    }

    public static function getLogo($bId) {
        $logo_name = '';
        $logo_src = '';
        $businessId = self::getBusinessID($bId);
        if (!empty($businessId)) {
            $data = TblBusiness::model()->findByPk($businessId);

            if (isset($data->logo_img) && !empty($data->logo_img)) {
                $logo_name = $data->logo_img;
                $logo_src = Yii::app()->request->baseUrl . '/images/upload/' . $logo_name;
            }
        } else {
            return Yii::app()->theme->baseUrl . '/images/cfs-logo.png';
        }

        return file_exists(YiiBase::getPathOfAlias('webroot') . '/images/upload/' . $logo_name) ? $logo_src : Yii::app()->theme->baseUrl . '/images/cfs-logo.png';
    }

    public static function getDataTag($tagColor) {
//        return '<font color="#' . $tagColor . '">' . $tagColor . '</font>';
        return '<div style="border:1px solid #000000;background-color:#' . $tagColor . '" id="tag_icon_30" class="tag_icon" >&nbsp;</div>';
    }

}

?>