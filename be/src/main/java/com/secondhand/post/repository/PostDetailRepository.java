package com.secondhand.post.repository;

import com.secondhand.post.entity.PostDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostDetailRepository extends JpaRepository<PostDetail, Long> {
}
