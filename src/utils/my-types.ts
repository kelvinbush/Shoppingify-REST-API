export interface CreateActiveListInput {
  name: string;
  listItems: ActiveListItemInput[];
}

export interface ActiveListItemInput {
  itemId: string;
  quantity: number;
}


/**
 * @description The input for the history item
 * @type {Object}
 * @property {String} itemId The id of the item
 * @property {Number} quantity The quantity of the item
 */
export interface HistoryListItemInput {
  itemId: string;
  quantity: number;
}

/**
 * @description The input for the history list
 * @type {Object}
 * @property {String} name The name of the list
 * @property {isComplete} isComplete The status of the list
 * @property {HistoryListItemInput[]} listItems The list of items
 */
export interface CreateHistoryListInput {
  name: string;
  isComplete: boolean;
  listItems: HistoryListItemInput[];
}
