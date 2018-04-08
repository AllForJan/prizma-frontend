import React from 'react'
import {config} from '../config'

const {google_api_key} = config

class _Map extends React.Component {
    componentDidMount() {
        window.initMap = () => {
            window.map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 7.5,
                center: {lat: 48.7, lng: 20}
            });

            window.map.data.loadGeoJson('http://ppa.tools.bratia.sk/?parts=%C3%81belov%C3%A1:7009/1%7C4201/1,Zvala:7801/1%7C9605/1');
        }
        const script = document.createElement('script')
        script.type = "text/javascript"
        script.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`
        document.querySelector('head').appendChild(script);
    }

    render() {
        return <div id="map" style={{height: '400px'}}/>
    }
}

export const Map = _Map