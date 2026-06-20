
<pre>
Cosmo — Full-Stack Social Media Platform (with muti-user life video streaming feature + individual profiles)

Engineering highlight:
1. WebRTC Live Streaming
2. Websocket signaling
3. MySQL social graph 
4. Feed system
5. S3 Media upload
6. AWS EC2 deployment
7. Apache support

Tech Stack:
1. React.js
2. MySQL
3. Node.js/Express.js
4. Socket.io/WebSocket
5. WebRTC
6. LESS/CSS
7. Webpack
8. AWS EC2
9. Apache

<a href="https://cosmo-one.com">Here is a live demo</a>
</pre>

<img width="1992" height="1860" alt="image" src="https://github.com/user-attachments/assets/711f8818-1513-402c-b038-17c7d5bf1748" />

Every user will have their own profile where it contains their 
1. Name
2. Gender
3. Date of Birth
4. Marital Status
5. Locations (Any places they have lived in the past or current. It's for other users to be able to find a particular user)
6. Professions (For other users to find another user of the same professions)
7. Hobbies (For other users to find another user of the same hobbies)
8. Schools (For other users to find another user of the same they school they have went, or currently at)

<img width="1992" height="772" alt="image" src="https://github.com/user-attachments/assets/e7d3f37f-63e4-4398-bade-1226391bc80e" />
User will be able to add photo album
<pre>
<br/>
<br/>
</pre>


<img width="1998" height="1860" alt="image" src="https://github.com/user-attachments/assets/b662bc5d-73e1-44d1-a96b-d823a5ba1af6" />
Photo album and media upload system integrated with AWS S3

<pre>
<br/>
<br/>  
</pre>


<img width="1998" height="1854" alt="image" src="https://github.com/user-attachments/assets/69e6ebe7-7a5e-439b-a101-cc68cf7781f2" />
<pre>User will be able to add comment(s) to each photo
<br/>
<br/>
</pre>

<img width="1986" height="1088" alt="image" src="https://github.com/user-attachments/assets/0ecddb4d-5cf8-44bb-b375-573e8aa9f8ca" />
<pre>User will be able to add posts
<br/>
<br/>
</pre>

Here is the full layout
<img width="996" height="1922" alt="image" src="https://github.com/user-attachments/assets/4337f204-69a8-4674-8840-37a1c3de81f2" />

<pre>
<br/>
<br/>
</pre>

<img width="1996" height="1860" alt="image" src="https://github.com/user-attachments/assets/2e03ad67-0f04-414c-981e-c3a854c39c58" />
User will be able to allow other users to follow them. 
<pre>
  
This implemented using a separate table on MySQL for follower/following with 
a pair of following_id and follower_id that are associated with the user ID 
and those pairs are used as primary key. Then I tailor each following or 
follower associated with the user account ID with the user of left join query
to retrieve their user information.
<br/>
<br/>
</pre>

<img width="2000" height="1860" alt="image" src="https://github.com/user-attachments/assets/633158ea-1a50-4fb7-8cfb-ea5babf82b6c" />
Supports live streaming with multi-user co-streaming functionality
User can stay in the chat only while watching the main streamer and other co-streamers to live stream.
<pre>
<br/>
Implemented this by using WebRTC with combination of WebSocket
Currently I am using the peer to peer method by using a STUN server to
reduce the cost of server bandwidth usage.
</pre>

<img width="2006" height="1854" alt="image" src="https://github.com/user-attachments/assets/29caf284-5b5a-40d8-89c9-9f7c9033afe3" />
If users want, they can just do chat only

This is achieved just by WebSocket

