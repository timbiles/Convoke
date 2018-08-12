import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import { updateLat, updateLng } from '../../../ducks/locationReducer';

class Location extends Component {
  state = {
    locationSelect: ''
  };

  handleSelect = location => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.updateLat(latLng.lat);
        this.props.updateLng(latLng.lng);
        console.log(latLng);
      })
      .then(() => this.props.updateLocation(location))
      .catch(err => console.error('error, error'));
  };

  render() {
    const { location } = this.props.create;

    return (
      <PlacesAutocomplete
        value={location}
        onChange={this.props.updateLocation}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="location_container">
            <label className="has-float-label">
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input'
                })}
              />
              <span id="ce_title">Location</span>
            </label>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#d1cfcf', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { updateLat, updateLng }
)(Location);
