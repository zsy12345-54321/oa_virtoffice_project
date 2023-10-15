import React, {useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import { MY_CHARACTER_INIT_CONFIG } from './characterConstants';
import OtherCharacter from './OtherCharacter';

function OtherCharacters({OtherCharactersData}) {
    return <>{
        Object.keys(OtherCharactersData).map((id) => (
            <OtherCharacter key={id}
                name={OtherCharactersData[id]["username"]}
                x = {OtherCharactersData[id]["position"]["x"]}
                y = {OtherCharactersData[id]["position"]["y"]}
                characterClass = {OtherCharactersData[id]["characterClass"]} />
            ))
            }
        </>
}

const mapStateToProps = (state) => {
    const OtherCharactersData = Object.keys(state.allCharacters.users)
    .filter((id) => id !== MY_CHARACTER_INIT_CONFIG.id).reduce((filterObj, key) => {
        filterObj[key] = state.allCharacters.users[key];
        return filterObj;
    }, {});
    console.log("test24 ", OtherCharactersData);
    return {OtherCharactersData: OtherCharactersData};
};

export default connect(mapStateToProps,{})(OtherCharacters);