drop database movie;

create database movie;

use movie;

create table user(
	userid int not null auto_increment,
	username varchar(225),
	password varchar(255),
	primary key(userid)
);

insert into user values (1,'user','pass');

select * from user;

create table overview(
	movieid int not null auto_increment,
    moviename varchar(225),
    movielogo longtext,
    genre varchar(50),
    synopsis varchar(225),
    cast longtext,
    masterreview longtext,
    masterrating int,
    primary key(movieid)
);

insert into overview values (1,'Dr Strange Multiverse of Madness','https://assets-prd.ignimgs.com/2022/02/14/doctor-strange-in-the-multiverse-of-madness-button-1644855515935.jpg',
						'fiction','Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle.',
                        'Benedict Cumberbatch as Dr. Stephen Strange | Elizabeth Olsen as Wanda Maximoff / Scarlet Witch | Chiwetel Ejiofor as Karl Mordo | Benedict Wong as Wong | Xochitl Gomez as America Chavez | Michael Stuhlbarg as Nicodemus West | Rachel McAdams as Christine Palmer',
                        'In Marvel Studios\' "Doctor Strange in the Multiverse of Madness," the MCU unlocks the Multiverse and pushes its boundaries further than ever before. Journey into the unknown with Doctor Strange, who, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.',
                        4);
	
insert into overview values (2,
						'THE HANGOVER',
                        'https://resizing.flixster.com/drrcA4lAlzLE3OQyutC7sVHOBVY=/206x305/v2/https://flxt.tmsimg.com/assets/p192248_p_v8_am.jpg',
						'comedy',
                        'Two days before his wedding, Doug (Justin Bartha) and three friends (Bradley Cooper, Ed Helms, Zach Galifianakis) drive to Las Vegas for a wild and memorable stag party',
                        'Bradley Cooper - Phil | Ed Helms - Stu | Zach Galifianakis - Alan | Justin Bartha - Doug - Heather | Graham - Jade | Jeffrey Tambor - Sid',
                        'With a clever script and hilarious interplay among the cast, The Hangover nails just the right tone of raunchy humor, and the non-stop laughs overshadow any flaw',
                        3);
                        
select * from overview;

create table userreview(
	movieid int not null,
    userreview longtext,
    reviewid int not null auto_increment,
    username varchar(255) not null,
    rating int not null,
    primary key(reviewid)
);

insert into userreview values 
(1,'The return of Benedict Cumberbatch to the world of Strange may seem chaotic madness to the uninitiated, but it’s thrilling to see livewire director Sam Raimi breathe hilarity and juicy horror into the Marvel formula that so needed a shakeup. This is it.',1,'Viz',4),
(1,'Marvel fans are gonna love all those fan-servicing, momentum-sapping cameos, but Raimi fans are going to find themselves liking the film more and more the longer it goes, because the director seems most firmly in control later on...',2,'Harz',4),
(1,'Even occasional bits of Sam Raimi-infused horror fun aren’t enough to right the lilting ship of Doctor Strange in the Multiverse of Madness.',3,'Rohz',5);


insert into userreview values 
(2,'In the case of The Hangover, Phillips made a decent diversion, but no classic; like its heroes you\'ll have a good time, then forget most of it when you wake up the following morning. It\'s a movie, not a film.',4,'Viz',5),
(2,'The Hangover isn\'t painful to watch. If friends drag you to this movie, you won\'t hate them afterwards. But maybe it\'ll seem a lot funnier if you are drinking.',5,'Harz',3),
(2,'The Hangover is funny but not deeply so. There\'s a difference between funny incidents piled up in a line and people who make us laugh because of who they are.',6,'Rohz',4);

select * from userreview;
 