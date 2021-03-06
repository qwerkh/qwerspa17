import {Pos_Term} from '../../../imports/collection/posTerm';

import {SpaceChar} from "../../../both/config.js/space"

Meteor.methods({
    queryPosTerm({q, filter, options = {limit: 10, skip: 0}}) {
        if (Meteor.userId()) {
            let data = {
                content: [],
                countPosTerm: 0,
            };
            let selector = {};
            if (!!q) {
                let reg = new RegExp(q);
                if (!!filter) {
                    selector[filter] = {$regex: reg, $options: 'mi'}
                } else {
                    selector.$or = [{name: {$regex: reg, $options: 'mi'}}, {
                        code: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {description: {$regex: reg, $options: 'mi'}}];
                }
            }
            let posTerms = Pos_Term.aggregate([
                {
                    $match: selector
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $limit: options.limit
                },
                {
                    $skip: options.skip
                }
            ]);
            if (posTerms.length > 0) {
                data.content = posTerms;
                let posTermTotal = Pos_Term.find(selector).count();
                data.countPosTerm = posTermTotal;
            }
            return data;
        }
    },
    queryPosTermById(id) {
        let data = Pos_Term.findOne({_id: id});
        return data;
    },
    insertPosTerm(data) {
        return Pos_Term.insert(data);
    },
    updatePosTerm(data) {
        return Pos_Term.update({_id: data._id},
            {
                $set: data
            });
    },
    removePosTerm(id) {
        return Pos_Term.remove({_id: id});
    }
});