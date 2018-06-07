<?php
class Custom extends CApplicationComponent  {
    public static function getWebsiteInterface() {

        $iphone = strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "iphone");
        $android = strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "android");
        $palmpre = strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "webos");
        $berry = strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "blackberry");
        $ipod = strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "ipod");

        if ($iphone || $android || $palmpre || $ipod || $berry == true) {
            $interface = 'mobile';
        } else {
            $interface = 'web';
        }
        return $interface;
    }
}
?>