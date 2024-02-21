-- Users table
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(255) NOT NULL,
full_name VARCHAR(255),
email VARCHAR(255),
verified BOOLEAN DEFAULT FALSE,
organisation_name VARCHAR(255),
phone_number VARCHAR(255),
address_number VARCHAR(255),
address_street VARCHAR(255),
address_city VARCHAR(255),
address_postcode VARCHAR(255),
biography TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
clerk_auth_id TEXT UNIQUE,
profile_picture_url TEXT ,
site_admin BOOLEAN DEFAULT FALSE)

-- Posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    post_type VARCHAR(255) CHECK (type IN ('asset', 'service', 'request' 'event', 'job', 'news', 'other')),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    quantity TEXT,
    frequency TEXT,
    "date", DATE,
    available BOOLEAN DEFAULT TRUE,
    closed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    image_url TEXT,
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    parent_comment_id INT NULL REFERENCES comments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
);

-- User List table
CREATE TABLE user_lists (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    list_type VARCHAR(255) CHECK (list_type IN ('favourites', 'watchlist', 'blacklist')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ###JUNCTION TABLES###
-- PostTags table
CREATE TABLE post_tags (
    post_id INT REFERENCES posts(id),
    tag_id INT REFERENCES tags(id),
    PRIMARY KEY(post_id, tag_id)
);
-- ListPosts table
CREATE TABLE list_posts (
    user_list_id INT REFERENCES user_lists(id),
    post_id INT REFERENCES posts(id),
    PRIMARY KEY(user_list_id, post_id)
);
-- Starred table
CREATE TABLE star (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    post_id INT NULL REFERENCES posts(id),
    comment_id INT NULL REFERENCES comments(id),
    star_type VARCHAR(255) CHECK (star_type IN ('post', 'comment')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id, comment_id, star_type)
);

-- INSERT INTO tags (content) VALUES ('tag1'), ('tag2'), ('tag3');

-- INSERT INTO post_tags (post_id, tag_id) VALUES
-- (1, 1),
-- (2, 2),
-- (3, 3),
-- (4, 1),
-- (5, 2),
-- (6, 3),
-- (7, 1);
