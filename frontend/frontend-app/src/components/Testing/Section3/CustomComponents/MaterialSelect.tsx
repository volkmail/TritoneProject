import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type PropsType = {
    isAcoustic: number,
    OnSelectChangeHandler: (event: React.ChangeEvent<{value: unknown}>) => void,
}

const SimpleSelect: React.FC<PropsType> = (props) => {

    return (
        <div>
            <Select onChange={props.OnSelectChangeHandler} value={props.isAcoustic}>
                <MenuItem value={1}>Расчет коэффициента звукоизоляции</MenuItem>
                <MenuItem value={0}>Расчет коэффициента виброизоляции</MenuItem>
            </Select>
        </div>
    );
}

export default SimpleSelect;
