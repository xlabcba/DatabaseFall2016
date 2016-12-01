module.exports = function(db) {

    db.query('CREATE TABLE IF NOT EXISTS `NormalUser` (`id` int(11) NOT NULL, PRIMARY KEY (`id`), CONSTRAINT `user` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);', function(err) {
        if (err) {
            throw err;
        } else {
            console.log('NormalUser TABLE created.');
        }
    });

    db.query('CREATE TABLE IF NOT EXISTS `User` (`id` int(11) NOT NULL AUTO_INCREMENT, `firstName` varchar(255) DEFAULT NULL, `lastName` varchar(255) DEFAULT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`));', function(err) {
        if (err) {
            throw err;
        } else {
            console.log('Users TABLE created.');
        }
    });

    db.query('CREATE TABLE IF NOT EXISTS `Admin` (`id` int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`), CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);', function(err) {
        if (err) {
            throw err;
        } else {
            console.log('Admin TABLE created.');
        }
    });

    db.query("CREATE TABLE IF NOT EXISTS `Movie` (`id` int(11) NOT NULL, `title` varchar(255) NOT NULL, `rating` enum('G','PG','PG-13','R','NC-17') NOT NULL, `starRating` varchar(255) NOT NULL, `cast` varchar(255) NOT NULL, `summary` text NOT NULL, `date` date NOT NULL, `genres` enum('Action','Comedy','Horror','Adventure','Scifi','Dramas', 'Family', 'Thriller') NOT NULL, `link` varchar(255) NOT NULL, `image` varchar(255) NOT NULL, `runtime` int(255) NOT NULL, `countries` text NOT NULL, `companies` text NOT NULL, PRIMARY KEY (`id`));", function(err) {
        if (err) {
            throw err;
        } else {
            console.log('Movie TABLE created.');
        }
    });

    db.query('CREATE TABLE IF NOT EXISTS `Comment` (`comments` int(11) NOT NULL, `commentedBy` int(11) NOT NULL, `text` text NOT NULL, `date` date NOT NULL, PRIMARY KEY (`comments`,`commentedBy`), KEY `commentedBy` (`commentedBy`), CONSTRAINT `commentedBy` FOREIGN KEY (`commentedBy`) REFERENCES `NormalUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `comments` FOREIGN KEY (`comments`) REFERENCES `Movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);', function(err) {
        if (err) {
            throw err;
        } else {
            console.log('Comment TABLE created.');
        }
    });

    db.query('CREATE TABLE IF NOT EXISTS `Favorite` (`savedBy` int(11) NOT NULL, `saves` int(11) NOT NULL, PRIMARY KEY (`savedBy`,`saves`), KEY `saves` (`saves`), CONSTRAINT `savedBy` FOREIGN KEY (`savedBy`) REFERENCES `NormalUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `saves` FOREIGN KEY (`saves`) REFERENCES `Movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);', function(err) {
        if (err) {
            throw err;
        } else {
            console.log('Favorite TABLE created.');
        }
    });

};