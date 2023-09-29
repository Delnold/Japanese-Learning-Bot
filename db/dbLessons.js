class DbLessons {
    constructor(lessonsDB, lessonAttrs) {
        this.db = lessonsDB
        this.JLPTAttributeName = lessonAttrs.JLPT
        this.levelAttributeName = lessonAttrs.level
        this.lessonAttributeName = lessonAttrs.lesson
        this.infoAttributeName = lessonAttrs.info
        this.idAttributeName = lessonAttrs.id
    }

    async getUniqueJLPT(collectionName) {
        try {
            const collection = this.db.collection(collectionName);
            const uniqueAttributes = await collection.distinct(this.JLPTAttributeName);
            return uniqueAttributes.sort();
        } catch (error) {
            console.error('Error getting unique attributes:', error);
            throw error;
        }
    }

    async getUniqueLevels(collectionName, JLPTAttributeValue, levelCount = 100) {
        try {
            const collection = this.db.collection(collectionName);
            const pipeline = [
                {
                    $match: {
                        [this.JLPTAttributeName]: JLPTAttributeValue,
                    }
                }, {
                    $group: {
                        [this.idAttributeName]: null,
                        [this.levelAttributeName]: {
                            $addToSet: `$${this.levelAttributeName}`
                        }
                    }
                }, {
                    $project: {
                        [this.idAttributeName]: false,
                        [this.levelAttributeName]: {
                            $sortArray: {
                                input: `$${this.levelAttributeName}`,
                                sortBy: 1
                            }
                        }
                    }
                }, {
                    $project: {
                        [this.levelAttributeName]: {
                            $slice:[
                                `$${this.levelAttributeName}`, levelCount]

                        }
                    }
                }
            ]
            const result = await collection.aggregate(pipeline).toArray()
            console.log(result)
            return result.length > 0 ? result[0][this.levelAttributeName]: [];
        } catch (error) {
            console.error("Error in aggregation of getting unique levels:", error);
            throw error;
        }
    }

    async getUniqueLessons(collectionName, JLPTAttributeValue, levelAttributeValue) {
        try {
            const collection = this.db.collection(collectionName);
            const pipeline = [
                {
                    $match: {
                        [this.JLPTAttributeName]: JLPTAttributeValue,
                        [this.levelAttributeName]: levelAttributeValue
                    }
                }, {
                    $group: {
                        [this.idAttributeName]: null,
                        [this.lessonAttributeName]: {
                            $addToSet: `$${this.lessonAttributeName}`
                        },
                        [this.infoAttributeName]: {
                            $addToSet: `$${this.infoAttributeName}`
                        }
                    }
                }, {
                    $project: {
                        [this.idAttributeName]: 0,
                        [this.lessonAttributeName]: {
                            $sortArray: {
                                input: `$${this.lessonAttributeName}`,
                                sortBy: 1
                            }
                        },
                        [this.infoAttributeName]: {
                            $sortArray: {
                                input: `$${this.infoAttributeName}`,
                                sortBy: 1
                            }
                        }
                    }
                }
            ]
            const result = await collection.aggregate(pipeline).toArray();
            console.log(result)
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error in aggregation of getting unique lessons:", error);
            throw error;
        }
    }


    async getLesson(collectionName, JLPTAttributeValue, levelAttributeValue, lessonAttributeValue) {
        try {
            const collection = this.db.collection(collectionName);
            const filter = {
                [this.JLPTAttributeName]: JLPTAttributeValue,
                [this.levelAttributeName]: levelAttributeValue,
                [this.lessonAttributeName]: lessonAttributeValue
            }
            return await collection.findOne(filter)
        } catch (error) {
            console.error("Error of getting lesson:", error);
            throw error;
        }
    }


}

export default DbLessons;