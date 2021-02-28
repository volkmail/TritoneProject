const choiceArticle = (articleId: number) => {
    return {
        type: 'CHOICE_ARTICLE',
        articleId
    } as const
}

export {
    choiceArticle
}