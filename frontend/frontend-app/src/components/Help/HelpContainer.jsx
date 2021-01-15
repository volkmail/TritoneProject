import {connect} from 'react-redux';
import {choiceArticle} from '../../redux/help-reducer.js'
import Help from "./Help";

let mstp = (state) => ({
    currentArticleId: state.helpPage.articleId
});

const HelpContainer = connect(mstp, {choiceArticle})(Help);

export default HelpContainer;