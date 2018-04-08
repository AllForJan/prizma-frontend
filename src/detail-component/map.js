import React from 'react'
import {connect} from 'react-redux'
import {config} from '../config'

const {google_api_key} = config

class _Map extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.url !== nextProps.url) {
            return true
        }
        return false
    }

    execute() {
        const {url} = this.props
        if (url) {
            window.initMap = () => {
                window.map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: 7.5,
                    center: {lat: 48.7, lng: 20}
                });

                window.map.data.loadGeoJson(url);
            }
            const script = document.createElement('script')
            script.async = true
            script.type = "text/javascript"
            script.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`
            document.querySelector('head').appendChild(script);
        }
    }

    render() {
        const {url} = this.props
        this.execute()
        return <div id="map" style={url ? {height: '400px'} : {}}/>
    }
}

const mapSelector = (state) => ({
    url: state.detail.user && state.detail.user.url_diely
})
export const Map = connect(mapSelector)(_Map)