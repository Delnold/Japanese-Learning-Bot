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
                        [this.idAttributeName]: `$${this.levelAttributeName}`,
                        [this.levelAttributeName]: {
                            $max: `$${this.levelAttributeName}`
                        }
                    }
                }, {
                    $sort: {
                        [this.levelAttributeName]: 1
                    }
                },{
                    $group: {
                        [this.idAttributeName]: null,
                        [this.levelAttributeName]: {
                            $push: `$${this.levelAttributeName}`
                        }
                    }
                }, {
                    $project: {
                         [this.idAttributeName]: 0,
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
                },
                {
                    $sort: {
                         [this.lessonAttributeName]: 1
                    }
                }, {
                    $group: {
                        [this.idAttributeName]: null,
                        [this.lessonAttributeName]: {
                            $push: `$${this.lessonAttributeName}`
                        },
                        [this.infoAttributeName]: {
                            $push: `$${this.infoAttributeName}`
                        }
                    }
                }, {
                    $project: {
                        [this.idAttributeName]: 0,
                        [this.lessonAttributeName]: 1,
                        [this.infoAttributeName]: 1
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