import React from 'react';
import '../entrypoints/popup/App.css';
import QRCode from 'easyqrcodejs';

class QrCode extends React.Component {
    constructor(props) {
        super(props);
        this.qrcode = React.createRef()
    }

    componentDidMount() {
        const options = {
            text: this.props.text,
            width: 150,
            height: 150,
            quietZone: 5,
            logo: "/logo.png",
            colorDark : "#000000",
            colorLight : "#ffffff",
        }
        this.qr = new QRCode( this.qrcode.current, options )
    }

    componentDidUpdate() {
        this.qr.makeCode(this.props.text)
    }

    componentWillUnmount() {
        this.qr.clear()
    }

    render() {
        return (
            <div ref={this.qrcode}></div> 
        );
    }
}

export default QrCode;