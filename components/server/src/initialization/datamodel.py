"""Data model loader."""

import json
import logging
import pathlib

from pymongo.database import Database

from database.datamodels import insert_new_datamodel, latest_datamodel


def import_datamodel(database: Database) -> None:
    """Read the data model and store it in the database."""
    data_model_path = pathlib.Path(__file__).resolve().parent.parent / "data" / "datamodel.json"
    with data_model_path.open() as json_data_model:
        data_model = json.load(json_data_model)
    if latest := latest_datamodel(database):
        del latest["timestamp"]
        del latest["_id"]
        if data_model == latest:
            logging.info("Skipping loading the data model; it is unchanged")
            return
    insert_new_datamodel(database, data_model)
    logging.info("Data model loaded")
