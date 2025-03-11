<script>
import logo from '/images/logo.webp';

export default {
    props: {
        authData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return { logo };
    },
    computed: {
        botLink() {
            return this.authData.bot_link;
        },
        isBotLinked() {
            return !!this.authData.msg;
        },
        isBotUnlinked() {
            return !!this.authData.bot_link;
        },
    },
    watch: {
        authData: {
            immediate: true,
            handler(newVal) {
                if (newVal.bot_link) {
                    const qr = qrcode(0, 'M');
                    qr.addData(newVal.bot_link);
                    qr.make();

                    const imageContainer = document.getElementById('qrcode');
                    if (imageContainer !== null) {
                        imageContainer.innerHTML = qr.createImgTag(5);
                    }
                }
            },
        },
    },
};
</script>

<template>
    <div class="container has-background-white">
        <div class="p-3 container">
            <header class="is-flex mb-4">
                <img :src="logo" alt="Пульс продаж новостроек" class="logo" />
            </header>
            <div class="mb-4">
                <a
                    href="https://t.me/pulsprodajru_supportbot"
                    class="support-link"
                >
                    Поддержка @pulsprodajru_supportbot
                </a>
                <h1 class="title has-text-centered">
                    Уникальный сервис мониторинга цен и предложения
                </h1>
            </div>

            <div v-if="authData.msg" class="has-text-centered mt-4 mb-4">
                <div class="mb-4" v-html="authData.msg"></div>
                <a
                    href="/tgauth/unlink/"
                    target="_blank"
                    class="button tg_auth_button is-link"
                >
                    Отвязать аккаунт Telegram
                </a>
            </div>

            <div v-else-if="authData.bot_link"  id="msg" class="has-text-centered mb-4">
                <div class="has-text-centered mb-4">
                    Для использования сервиса авторизуйтесь через Telegram и
                    подпишитесь на наш канал
                </div>

                <div class="has-text-centered mb-4">
                    <a
                        :href="botLink"
                        target="_blank"
                        class="button tg_auth_button is-link"
                    >
                        Авторизоваться через Telegram
                    </a>
                </div>
                <div class="has-text-centered">
                    Отсканируйте QR-код ниже для авторизации с телефона
                </div>
                <div class="has-text-centered mb-4" id="qrcode">
                    <img
                        src="data:image/gif;base64,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"
                        width="225"
                        height="225"
                    />
                </div>
            </div>

            <div class="columns is-multiline">
                <div class="column">
                    <div class="box">
                        <h2 class="box-title">
                            <i class="fas fa-map-marker-alt"></i>
                            Все актуальные проекты ПИК, в Москве и СПб
                        </h2>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <h2 class="box-title">
                            <i class="fas fa-sync-alt"></i>
                            Обновляется каждый час
                        </h2>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <h2 class="box-title">
                            <i class="fas fa-chart-line"></i>
                            Наглядное отображение изменения цены за сутки по
                            проектам. Удобно ловить подешевевшее или старты
                        </h2>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <h2 class="box-title">
                            <i class="fas fa-calculator"></i>
                            Статистика изменения цены от суток, до всего срока
                            экспозиции.
                        </h2>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <h2 class="box-title">
                            <i class="fas fa-history"></i>
                            История бронирования лотов, и даты снятия с витрины
                        </h2>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <h2 class="box-title">
                            <i class="fas fa-search"></i>
                            Поиск конкретного лота по ссылке с сайта проекта.
                            Удобно проверять скидки на реальность
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    border-inline: 1px solid rgb(198, 193, 193, 0.2);
    min-height: 100vh;
}

.logo {
    width: 12rem;
}

.mb-4 {
    margin-bottom: 1.5rem !important;
}
.support-link {
    margin-bottom: 4rem;
    display: block;
}
.box {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    background-color: #f8f8f8;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    flex: 1;
    min-width: 250px;
    max-width: 100%;
}

.box-title {
    color: rgb(50, 115, 220);
    font-size: 1.25rem;
    text-align: center;
}
</style>
