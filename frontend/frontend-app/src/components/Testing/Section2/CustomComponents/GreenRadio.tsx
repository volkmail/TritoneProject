import {withStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import Radio, {RadioProps} from "@material-ui/core/Radio";
import React from "react";

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export default GreenRadio;