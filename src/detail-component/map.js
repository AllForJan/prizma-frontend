import React from 'react'
import {config} from '../config'

const {google_api_key} = config

class _Map extends React.Component {
    componentDidMount() {
        window.initMap = () => {
            window.map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: -28, lng: 137}
            });

            window.map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');
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