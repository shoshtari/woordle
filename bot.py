import requests
from dataclasses import dataclass
import os


@dataclass
class TelegramUpdate:
    chat_id: str
    message: str


BOT_TOKEN = os.environ.get("BOT_TOKEN")
WOORDLE_SERVER = os.environ.get("WOORDLE_SERVER")


processed_updates = set()


def update_lang(bale_id, lang):
    requests.post(
        "http://localhost:8000/change_lang/", json={"lang": lang, "bale_id": bale_id}
    ).raise_for_status()


def process_update(update: TelegramUpdate):
    if update.message == "/start":
        # return a message with two reply button, 'a' and 'b'
        res = requests.post(
            f"https://tapi.bale.ai/{BOT_TOKEN}/sendMessage",
            {
                "chat_id": update.chat_id,  # update.chat_id
                "text": 'برای بازی فارسی کلمه «فارسی» و برای بازی انگلیسی کلمه "english" را وارد کنید',
            },
        )
        res.raise_for_status()
    print(update.message.lower())
    if update.message.lower() == "english":
        update_lang(update.chat_id, "english")
        res = requests.post(
            f"https://tapi.bale.ai/{BOT_TOKEN}/sendMessage",
            {
                "chat_id": update.chat_id,  # update.chat_id
                "text": "Your language is english.",
            },
        )
        res.raise_for_status()
    if update.message == "فارسی":
        update_lang(update.chat_id, "persian")
        res = requests.post(
            f"https://tapi.bale.ai/{BOT_TOKEN}/sendMessage",
            {
                "chat_id": update.chat_id,  # update.chat_id
                "text": "زبان شما فارسی است.",
            },
        )
        res.raise_for_status()


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

        print(update)
        if update["message"]["chat"]["type"] != "private":
            continue
        yield TelegramUpdate(
            chat_id="1239963443",
            # chat_id=update["message"]["chat"]["id"],
            message=update["message"]["text"],
        )


if __name__ == "__main__":
    while True:
        try:
            for update in get_updates():
                process_update(update)
        except Exception as e:
            raise e
            print(f"error occurred {e}")
