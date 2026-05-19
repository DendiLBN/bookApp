import { Link } from "react-router-dom";

import { Button, Empty } from "antd";

export const FavoritesEmptyState = () => (
  <div className="book-page__empty">
    <Empty description="No favorite books yet">
      <Link to="/book">
        <Button type="primary">Browse books</Button>
      </Link>
    </Empty>
  </div>
);
