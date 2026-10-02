import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import styles from './Tabs.module.scss';

export default function ChatTab() {
    const [activeChat, setActiveChat] = useState(1);
    const [inputMsg, setInputMsg] = useState('');

    const conversations = [
        { id: 1, name: 'Nguyễn Văn A', room: 'Phòng 201 - Q.3', lastMsg: 'Phòng này còn trống không ạ?' },
        { id: 2, name: 'Trần Thị B', room: 'Studio Q.10', lastMsg: 'Chiều nay em qua xem phòng được không?' },
    ];

    const [messages, setMessages] = useState([
        { sender: 'them', text: 'Chào chủ trọ, phòng 201 còn trống không ạ?', time: '10:28 AM' },
        { sender: 'me', text: 'Chào bạn, phòng 201 hiện vẫn còn trống nhé.', time: '10:29 AM' },
        { sender: 'them', text: 'Giá thuê đã bao gồm tiền điện nước chưa ạ?', time: '10:30 AM' },
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;
        setMessages([...messages, { sender: 'me', text: inputMsg, time: 'Vừa xong' }]);
        setInputMsg('');
    };

    return (
        <div className={styles.tabContainer}>
            <div className={styles.chatBoxPanel}>
                <div className={styles.chatSidebar}>
                    {conversations.map((c) => (
                        <div
                            key={c.id}
                            className={`${styles.chatUser} ${activeChat === c.id ? styles.active : ''}`}
                            onClick={() => setActiveChat(c.id)}
                        >
                            <div className={styles.userMeta}>
                                <span className={styles.name}>{c.name}</span>
                                <span className={styles.room}>{c.room}</span>
                                <span className={styles.lastMsg}>{c.lastMsg}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.chatMain}>
                    <div className={styles.chatHeader}>
                        Khách thuê: Nguyễn Văn A — (Đang hỏi: Phòng 201 - Q.3)
                    </div>

                    <div className={styles.chatMessages}>
                        {messages.map((m, i) => (
                            <div key={i} className={`${styles.msg} ${m.sender === 'me' ? styles.mine : styles.theirs}`}>
                                <div>{m.text}</div>
                                <span className={styles.time}>{m.time}</span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className={styles.chatInput}>
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                        />
                        <button type="submit"><FiSend /> Gửi</button>
                    </form>
                </div>
            </div>
        </div>
    );
}