import {connect} from 'react-redux';
import {choiceArticle} from '../../redux/reducers/help-reducer.js'
import Help from "./Help";
import {GetArticleId} from "../../redux/selectors/help-selector";

let mstp = (state) => ({
    currentArticleId: GetArticleId(state)
});

const HelpContainer = connect(mstp, {choiceArticle})(Help);

export default HelpContainer;