import React from 'react'
import {Button} from 'react-bootstrap'
import { useHistory  } from 'react-router-dom'

const NotFound = () => {
    let history = useHistory();
    function gotoHome(){
        history.push("/")
    }

    return (
        <div className="nofound-page">
            <h1 className="text-center">404</h1>
            <h2 className="text-center">Sayfa Bulunamadı!</h2>
            <p className="text-center" style={{marginTop: "6px"}}>
                Hata oluştu. Aradığınız sayfayı bulamadık. Lütfen daha sonra tekrar deneyiniz!
            </p>
            <Button onClick={gotoHome} style={{marginTop: "16px"}}>ANASAYFAYA GİT</Button>
        </div>
    )
}

export default NotFound
