const letterQuizResults = async (activity) => {
    const boldText = "*Results:*\n\n"
    let normalText = ""
    let correctAnswers = 0;
    const answeredCount = activity["testArrayAnswered"].length
    for (let i = 0; i < answeredCount; i++){
        normalText += "Question: " + activity["testArrayQuestion"][i] + '\n'
        normalText += "Correct Answer: " + activity["testArrayAnswers"][i] + '\n'
        normalText += "Your Answer: " + activity["testArrayAnswered"][i] + '\n\n'

    }
    return boldText + normalText
}

export default letterQuizResults;