import requests
from dataclasses import dataclass
import os


@dataclass
class TelegramUpdate:
    chat_id: str
    message: str


BOT_TOKEN = os.environ.get("BOT_TOKEN")


processed_updates = set()


def proccess_update(update: TelegramUpdate):
    if update.message == "/start":
        # return a message with two reply button, 'a' and 'b'
        res = requests.post(
            f"https://tapi.bale.ai/{BOT_TOKEN}/sendMessage",
            {
                "chat_id": update.chat_id,
                "text": "Choose one",
                "reply_markup": {
                    "keyboard": [["English", "فارسی"]],
                    "one_time_keyboard": True,
                    "resize_keyboard": True,
                },
            },
        )
        res.raise_for_status()
    if update.message == "English":
        pass 
    if update.message == "فارسی":
        pass



def get_updates():
    url = f"https://tapi.bale.ai/{BOT_TOKEN}/getUpdates?offset=1"
    res = requests.get(url)
    res.raise_for_status()
    if not res.json()["ok"]:
        raise ValueError(f"Error in getting updates {res.content}")

    for update in res.json()["result"]:
        if update["update_id"] in processed_updates:
            continue
        processed_updates.add(update["update_id"])

        if update["messsage"]["chat"]["type"] != "private":
            continue
        yield TelegramUpdate(
            chat_id=update["message"]["chat"]["id"],
            message=update["message"]["text"],
        )


if __name__ == "__main__":
    try:
        for update in get_updates():
            process_update()
    except Exception as e:
        print(f"error occurred {e}")
